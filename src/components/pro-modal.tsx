"use client";

import axios from "axios";
import { useState } from "react";
import { Zap } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { tools } from "../../constants";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log("error is",error)
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className="">
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Upgrade to Pro
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium h-full py-3 my-4 min-h-full overflow-scroll">
            {/* <div className="flex items-center justify-center flex-col bg-[#E5E5E5]"> */}

            <div className="bg-[#F4F5FA] my-6 p-10 rounded-xl overflow-y-scroll">
              <div className="flex flex-col justify-center items-center text-center">
                <div className="max-w-sm font-bold font-sans">
                  Get the most out of your mobile with the right subscription
                </div>
                <div className="font-light max-w-lg mt-5 text-sm">
                  All devices come with free delivery or pickup as standard. See
                  information on available shopping options for your location.
                </div>
              </div>

              <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-12  md:space-y-0 justify-center items-center mt-10">
                <div className="bg-[#FFFBEC] rounded-xl">
                  <div className="flex flex-col p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-96 md:w-auto">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Ice_logo.svg/138px-Ice_logo.svg.png?20191213230535"
                      className="w-8"
                    />
                    <div className="mt-3 font-semibold text-lg">
                      Ice Mobile 10GB
                    </div>
                    <div className="text-sm font-light">Up to 100Mbit/s</div>
                    <div className="my-4">
                      <span className="font-bold text-base">299,-</span>
                      <span className="font-light text-sm">/month</span>
                    </div>

                    <button className="bg-[#F4F5FA] px-4 py-3 rounded-full  border border-[#F0F0F6] shadow-xl mt-4">
                      Add subscription
                    </button>
                  </div>
                </div>

                <div className="bg-[#F9ECFF] rounded-xl">
                  <div className="flex flex-col p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-96 md:w-auto">
                    <img
                      src="https://www.dstny.se/app/uploads/telia_pp_rgb.png.webp"
                      className="w-12"
                    />
                    <div className="mt-3 font-semibold text-lg">
                      Telia Mobil 15GB
                    </div>
                    <div className="text-sm font-light w-60 md:w-auto">
                      Unlimited calls
                    </div>
                    <div className="my-4">
                      <span className="font-bold text-base">953,-</span>
                      <span className="font-light text-sm">/month</span>
                    </div>

                    <button className="bg-[#F4F5FA] px-4 py-3 rounded-full  border border-[#F0F0F6] shadow-xl mt-4">
                      Add subscription
                    </button>
                  </div>
                </div>

                {/* <div className="bg-[#ECEEFF] rounded-xl">
                  <div className="flex flex-col p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-96 md:w-auto">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Telenor_Logo.svg/1600px-Telenor_Logo.svg.png"
                      className="w-12"
                    />
                    <div className="mt-3 font-semibold text-lg">
                      Telenor Next Fast
                    </div>
                    <div className="text-sm font-light w-60 md:w-auto">
                      Up to 100Mbit/s
                    </div>
                    <div className="my-4">
                      <span className="font-bold text-base">1028,-</span>
                      <span className="font-light text-sm">/month</span>
                    </div>

                    <button className="bg-[#F4F5FA] px-4 py-3 rounded-full  border border-[#F0F0F6] shadow-xl mt-4">
                      Add subscription
                    </button>
                  </div>
                </div> */}
              </div>

              <div className="flex justify-center">
                <button className="mt-12 bg-slate-900 text-white px-4 rounded-full py-3">
                  See all subscriptions
                </button>
              </div>
            </div>
            {/* </div> */}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            size="lg"
            variant="premium"
            className="w-full"
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
