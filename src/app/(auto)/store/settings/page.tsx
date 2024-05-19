"use client";

import { FeatureFlagForm } from "@/components/forms/feature-flag-form";

export default function Settings() {
  return (
    <div className="flex flex-col justify-start align-top items-start grow w-full h-auto~~ p-6 max-w-screen-3xl m-auto">
      <section className="flex justify-between w-full h-auto mb-4">
        <h1 className="text-xl md:text-2xl font-semibold">Store Settings</h1>
      </section>
      <section className="flex w-full h-full gap-8 md:flex-row justify-start bg-background p-6 rounded-md">
        <FeatureFlagForm />
      </section>
    </div>
  );
}
