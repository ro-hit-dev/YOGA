"use client"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { useSearchParams, useRouter } from "next/navigation"
import useSWR from "swr"
import type { Course, Session } from "@/lib/data"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BookingProgress from "@/components/booking-progress"
import { useState } from "react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const Schema = z.object({
  courseSlug: z.string(),
  sessionId: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  room: z.enum(["Shared", "Private"]),
  payment: z.enum(["Stripe", "Razorpay", "PayPal"]),
})

type FormValues = z.infer<typeof Schema>

type Data = {
  courses: Course[]
  sessions: Session[]
}

export default function BookPage() {
  const search = useSearchParams()
  const defaultCourse = search.get("course") ?? ""
  const defaultSession = search.get("session") ?? ""
  const router = useRouter()

  const { data } = useSWR<Data>("/api/book-data", fetcher)
  const allCourses = data?.courses ?? []
  const allSessions = data?.sessions ?? []

  const { register, handleSubmit, control, watch, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      courseSlug: defaultCourse,
      sessionId: defaultSession || "",
      room: "Shared",
      payment: "Stripe",
      name: "",
      email: "",
    },
  })

  const courseSlug = watch("courseSlug")
  const sessionsForCourse = allSessions.filter((s) => allCourses.find((c) => c.slug === courseSlug)?.id === s.courseId)

  async function onSubmit(values: FormValues) {
    const res = await fetch("/api/book", { method: "POST", body: JSON.stringify(values) })
    const json = await res.json()
    reset()
    router.push(`/book?success=1&ref=${encodeURIComponent(json.reference)}`)
  }

  const success = search.get("success") === "1"
  const ref = search.get("ref")

  const [currentStep, setCurrentStep] = useState(0)
  const steps = ["Course & Session", "Guest Details", "Payment"]

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-semibold">Book Your Program</h1>
        <p className="mt-2 text-muted-foreground">Secure your spot in a few simple steps.</p>

        {!success && (
          <>
            <BookingProgress currentStep={currentStep} steps={steps} />
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="cursor-pointer" onClick={() => setCurrentStep(0)}>
                    1) Course & Session
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Course</Label>
                    <Controller
                      name="courseSlug"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                          <SelectContent>
                            {allCourses.map((c) => (
                              <SelectItem key={c.slug} value={c.slug}>
                                {c.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Session</Label>
                    <Controller
                      name="sessionId"
                      control={control}
                      render={({ field }) => (
                        <Select disabled={!courseSlug} value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a session" />
                          </SelectTrigger>
                          <SelectContent>
                            {sessionsForCourse.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {new Date(s.startDate).toLocaleDateString()} –{" "}
                                {new Date(s.endDate).toLocaleDateString()} • {s.seats} seats • {s.status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="cursor-pointer" onClick={() => setCurrentStep(1)}>
                    2) Guest Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Name</Label>
                    <Input {...register("name")} placeholder="Full name" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input {...register("email")} type="email" placeholder="you@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Room Preference</Label>
                    <Controller
                      name="room"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-6">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="Shared" id="shared" />
                            <Label htmlFor="shared">Shared</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="Private" id="private" />
                            <Label htmlFor="private">Private</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="cursor-pointer" onClick={() => setCurrentStep(2)}>
                    3) Payment
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <Controller
                    name="payment"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-6">
                        {["Stripe", "Razorpay", "PayPal"].map((p) => (
                          <div key={p} className="flex items-center gap-2">
                            <RadioGroupItem value={p} id={p} />
                            <Label htmlFor={p}>{p}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  />
                  <Button type="submit" className="text-white" style={{ backgroundColor: "#7f4f24" }}>
                    Confirm & Pay
                  </Button>
                  {formState.errors && Object.keys(formState.errors).length > 0 && (
                    <p className="text-sm text-red-600">Please complete all required fields.</p>
                  )}
                </CardContent>
              </Card>
            </form>
          </>
        )}

        {success && (
          <Card className="mt-6 border-emerald-200">
            <CardHeader>
              <CardTitle>Booking Confirmed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">Thank you! Your payment was processed successfully.</p>
              <p className="text-sm">
                Reference: <span className="font-mono">{ref}</span>
              </p>
              <p className="text-sm">A confirmation email has been sent with your itinerary and next steps.</p>
            </CardContent>
          </Card>
        )}
      </section>
      <SiteFooter />
    </main>
  )
}
