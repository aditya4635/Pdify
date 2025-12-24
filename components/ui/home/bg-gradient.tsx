"use client";
import React from 'react';

const BgGradient: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-background overflow-hidden">
            {/* Top-left purple blob */}
            <div className="absolute top-[-15%] left-[-5%] w-[45%] h-[45%] rounded-full bg-primary/15 dark:bg-primary/20 blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
            
            {/* Bottom-right blue/cyan blob */}
            <div className="absolute bottom-[-10%] right-[-8%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-secondary/30 blur-[90px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
            
            {/* Center accent blob */}
            <div className="absolute top-[35%] left-[45%] w-[35%] h-[35%] rounded-full bg-violet-300/15 dark:bg-accent/20 blur-[110px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
            
            {/* Top-right pink blob */}
            <div className="absolute top-[10%] right-[5%] w-[30%] h-[30%] rounded-full bg-pink-300/10 dark:bg-pink-500/15 blur-[80px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '3s' }} />
        </div>
    );
};

export default BgGradient;