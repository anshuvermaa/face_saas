import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { MAX_FREE_COUNTS } from "../../constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProModal } from "@/hooks/use-pro-modal";
import Link from "next/link";

export  const FreeCounter =({
  isPro = false,
  apiLimitCount = 0,
  plan,
  limit
}: {
  isPro: boolean;
  apiLimitCount: number;
  plan?:string,
  limit?:number
}) => {

 
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  

  useEffect(() => {
    setMounted(true);
  }, []);
    useEffect(() => {
    }, [apiLimitCount]);

  if (!mounted) {
    return null;
  }



  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {(limit)?(limit):(MAX_FREE_COUNTS)}{" "} 
              {isPro ? plan : "Free Generations"}
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / limit!) * 100}
            />
          </div>
            <Link href={"/settings"}>
          <Button variant="premium" className="w-full">
              {isPro ? "Change Plan" : "Upgrade"}
              <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
};
