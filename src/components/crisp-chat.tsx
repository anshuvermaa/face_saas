"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("1725e620-705c-464e-bcb2-890ec691d4fc");
  }, []);

  return null;
};
