import { Code, ImageIcon, MessageSquare, ArrowLeftRight, VideoIcon } from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: 'Chat Conversation',
    icon: MessageSquare,
    href: '/chat',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },
  {
    label: 'lipsync',
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: '/lipsync',
  },
  {
    label: 'faceswap',
    icon: ArrowLeftRight,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/faceswap',
  },
];
