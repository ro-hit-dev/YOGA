"use client"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import InteractiveMap from "@/components/interactive-map"
import { motion } from "framer-motion"

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

type FormValues = z.infer<typeof Schema>

export default function ContactPageClient() {
  const { register, handleSubmit, reset, formState } = useForm<FormValues>({ resolver: zodResolver(Schema) })
  const { errors, isSubmitting, isSubmitSuccessful } = formState

  async function onSubmit(values: FormValues) {
    await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) })
    reset()
  }

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-semibold">Contact</h1>
        <p className="mt-2 text-muted-foreground">We usually reply within 24 hours.</p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 grid gap-4"
        >
          <div>
            <label className="text-sm">Name</label>
            <Input {...register("name")} placeholder="Your name" />
            {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input {...register("email")} type="email" placeholder="you@example.com" />
            {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm">Message</label>
            <Textarea {...register("message")} placeholder="How can we help?" rows={5} />
            {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
          </div>
          <Button disabled={isSubmitting} className="text-white" style={{ backgroundColor: "#7f4f24" }}>
            {isSubmitting ? "Sending..." : "Send message"}
          </Button>
          {isSubmitSuccessful && <p className="text-sm text-emerald-700">Thanks! We will get back to you shortly.</p>}
        </motion.form>

        <div className="mt-10">
          <InteractiveMap />
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
