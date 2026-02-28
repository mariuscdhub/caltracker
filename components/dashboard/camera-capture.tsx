"use client";

import { useRef, useState, useEffect } from "react";
import { Image as ImageIcon, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface CameraCaptureProps {
    onCapture: (base64: string) => void;
    onClose: () => void;
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isMirror, setIsMirror] = useState(false);
    const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        startCamera(facingMode);
        return () => {
            stopCamera();
        };
    }, [facingMode]);

    const startCamera = async (mode: 'environment' | 'user') => {
        stopCamera();
        setError(null);
        try {
            const newStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: mode }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
            }
            setStream(newStream);
            setIsMirror(mode === 'user');
        } catch (err) {
            console.error("Impossible d'accéder à la caméra", err);
            // Fallback without facingMode specification
            try {
                const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = fallbackStream;
                }
                setStream(fallbackStream);
                setIsMirror(false); // Defaulting for fallback
            } catch (fallbackErr) {
                console.error("Aucune caméra trouvée", fallbackErr);
                setError("Impossible d'accéder à la caméra de votre appareil.");
            }
        }
    };

    const stopCamera = () => {
        // Must use function scope variable if needed, but stream state might be stale in cleanup hook
        // we'll rely on the video srcObject fallback
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const handleTakePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;

        // Match canvas size to video actual size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw video frame to canvas
        if (isMirror) {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const base64 = canvas.toDataURL('image/jpeg', 0.8);
        onCapture(base64);
        stopCamera();
    };

    const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            onCapture(base64String);
            stopCamera();
        };
        reader.readAsDataURL(file);
    };

    const toggleCamera = () => {
        setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
    };

    const handleClose = () => {
        stopCamera();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col justify-between overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/60 to-transparent">
                <button onClick={handleClose} className="p-3 bg-black/40 rounded-full text-white backdrop-blur-md active:scale-95 transition-all">
                    <X className="w-6 h-6" />
                </button>
                <div className="text-white bg-black/40 px-5 py-2 rounded-full text-sm font-black tracking-widest backdrop-blur-md border border-white/10 shadow-lg">
                    CAL AI
                </div>
                <button onClick={toggleCamera} className="p-3 bg-black/40 rounded-full text-white backdrop-blur-md active:scale-95 transition-all">
                    <RotateCcw className="w-6 h-6" />
                </button>
            </div>

            {/* Error State */}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center p-8 z-20">
                    <div className="bg-neutral-900 border border-white/10 p-6 rounded-3xl text-center space-y-4">
                        <p className="text-white font-bold">{error}</p>
                        <p className="text-sm text-neutral-400">Veuillez autoriser l'accès à la caméra ou sélectionner une photo depuis votre galerie.</p>
                        <button
                            onClick={handleClose}
                            className="w-full bg-white text-black font-bold py-3 rounded-xl mt-4"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}

            {/* Camera View */}
            <div className="absolute inset-0 z-0 bg-neutral-900 flex items-center justify-center">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className={cn(
                        "w-full h-full object-cover",
                        isMirror ? "scale-x-[-1]" : ""
                    )}
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Visual Camera Guides */}
                <div className="absolute inset-0 border-[1px] border-white/20 m-10 rounded-[40px] pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
                    <div className="w-16 h-16 border-t-2 border-l-2 border-white/40 absolute top-10 left-10 rounded-tl-3xl"></div>
                    <div className="w-16 h-16 border-t-2 border-r-2 border-white/40 absolute top-10 right-10 rounded-tr-3xl"></div>
                    <div className="w-16 h-16 border-b-2 border-l-2 border-white/40 absolute bottom-10 left-10 rounded-bl-3xl"></div>
                    <div className="w-16 h-16 border-b-2 border-r-2 border-white/40 absolute bottom-10 right-10 rounded-br-3xl"></div>
                </div>
            </div>

            {/* Controls bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent p-8 flex items-end justify-between z-10">
                {/* Gallery Button */}
                <div className="w-16 flex items-end justify-start">
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleGalleryUpload}
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-14 h-14 rounded-2xl bg-black/40 border border-white/20 flex items-center justify-center backdrop-blur-xl active:scale-95 transition-all overflow-hidden group"
                    >
                        <ImageIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>
                </div>

                {/* Shutter Button */}
                <div className="w-auto flex items-end justify-center">
                    <button
                        onClick={handleTakePhoto}
                        disabled={!!error}
                        className="w-20 h-20 rounded-full border-[3px] border-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                        <div className="w-[68px] h-[68px] rounded-full bg-white group-active:w-[60px] group-active:h-[60px] transition-all"></div>
                    </button>
                </div>

                {/* Empty Space for Balance */}
                <div className="w-16 flex items-end justify-end"></div>
            </div>
        </div>
    );
}
