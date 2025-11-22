"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  peerBuildConnection,
  placePeerCall,
  terminatePeerCall,
  toggleAudio,
  toggleVideo,
  startVideoStream,
} from "@/peer/utils";
import { useUser } from "@clerk/nextjs";
import { type Peer, type MediaConnection } from "peerjs";
import { useEffect, useRef, useState } from "react";

import {
  Mic,
  Video,
  Monitor,
  PhoneOff,
  MessageSquare,
  MoreVertical,
  Users,
  Maximize2,
} from "lucide-react";
export default function CallsPage() {
  const { user } = useUser();
  const [peer, setPeer] = useState<Peer | null>(null);
  const [peerId, setPeerId] = useState<string>("");
  const [remotePeerId, setRemotePeerId] = useState<string>("");
  const [call, setCall] = useState<MediaConnection | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const peerInstance = peerBuildConnection(user.id);
    setPeer(peerInstance);

    peerInstance.on("open", (id) => {
      setPeerId(id);
      startVideoStream((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      });
    });

    peerInstance.on("call", (incomingCall) => {
      startVideoStream((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        incomingCall.answer(stream);
        incomingCall.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
        setCall(incomingCall);
      });
    });

    return () => {
      peerInstance.destroy();
    };
  }, [user]);

  const handleCall = () => {
    startVideoStream((stream) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      if (peer) {
        const outgoingCall = peer.call(remotePeerId, stream);
        outgoingCall.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
        setCall(outgoingCall);
      }
    });
  };

  const handleEndCall = () => {
    if (call) {
      terminatePeerCall(call);
      setCall(null);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    }
  };

  const handleToggleAudio = () => {
    if (call) {
      const newAudioState = !isAudioEnabled;
      toggleAudio(call.localStream, newAudioState);
      setIsAudioEnabled(newAudioState);
    }
  };

  const handleToggleVideo = () => {
    if (call) {
      const newVideoState = !isVideoEnabled;
      toggleVideo(call.localStream, newVideoState);
      setIsVideoEnabled(newVideoState);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-xl font-semibold text-neutral-900">Calls</h1>
      <p>Your Peer ID: {peerId}</p>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={remotePeerId}
          onChange={(e) => setRemotePeerId(e.target.value)}
          placeholder="Remote Peer ID"
        />
        <Button onClick={handleCall} disabled={!remotePeerId || !!call}>
          Call
        </Button>
        <Button onClick={handleEndCall} disabled={!call} variant="destructive">
          End Call
        </Button>
      </div>
      <div className="flex gap-4">
        <Button onClick={handleToggleAudio} disabled={!call}>
          {isAudioEnabled ? "Mute Audio" : "Unmute Audio"}
        </Button>
        <Button onClick={handleToggleVideo} disabled={!call}>
          {isVideoEnabled ? "Mute Video" : "Unmute Video"}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="aspect-video w-full rounded-md bg-neutral-200"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="aspect-video w-full rounded-md bg-neutral-200"
        />
      </div>
    </div>
  );
}

export function DashboardCallsRedesign() {
  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-white">
            Advanced Physics: Quantum Mechanics
          </h1>
          <div className="mt-1 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm text-[#8A8F98]">Live • 00:42:15</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-md p-2 text-[#8A8F98] transition-colors hover:bg-white/5">
            <Users className="h-5 w-5" />
          </button>
          <button className="rounded-md p-2 text-[#8A8F98] transition-colors hover:bg-white/5">
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="relative mb-6 grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Tutor Video Placeholder */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#1C1D21]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#5E6AD2] to-[#929BF0] text-2xl font-bold text-white shadow-[0_0_40px_-10px_rgba(94,106,210,0.5)]">
              AT
            </div>
          </div>

          {/* Speaking Indicator */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-[#5E6AD2]/0 transition-colors duration-300 group-hover:border-[#5E6AD2]/20" />

          <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-black/40 px-3 py-1.5 backdrop-blur-md">
              <Mic className="h-3 w-3 text-green-500" />
              <span className="text-sm font-medium text-white">
                Alex Thompson (Tutor)
              </span>
            </div>
          </div>
        </div>

        {/* Student Video Placeholder (Self) */}
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#1C1D21]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#2C2D33] text-2xl font-bold text-[#8A8F98]">
              You
            </div>
          </div>

          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-black/40 px-3 py-1.5 backdrop-blur-md">
              <Mic className="h-3 w-3 text-white/50" />
              <span className="text-sm font-medium text-white">
                John Student
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex justify-center">
        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#1C1D21]/80 px-6 py-3 shadow-2xl backdrop-blur-xl">
          <ControlBtn icon={Mic} label="Mute" active />
          <ControlBtn icon={Video} label="Camera" active />
          <ControlBtn icon={Monitor} label="Share" />

          <div className="mx-2 h-8 w-px bg-white/10" />

          <ControlBtn icon={MessageSquare} label="Chat" badge="3" />
          <ControlBtn icon={MoreVertical} label="More" />

          <div className="mx-2 h-8 w-px bg-white/10" />

          <button className="group rounded-xl bg-red-500/10 p-3 text-red-500 transition-colors hover:bg-red-500/20">
            <PhoneOff className="h-5 w-5 transition-transform group-hover:scale-110" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ControlBtn({
  icon: Icon,
  active,
  badge,
}: {
  icon: any;
  label: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <button
      className={`group relative rounded-xl p-3 transition-all duration-200 ${
        active
          ? "bg-white/10 text-white hover:bg-white/15"
          : "text-[#8A8F98] hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon className="h-5 w-5" />
      {badge && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#1C1D21] bg-[#5E6AD2] text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}
