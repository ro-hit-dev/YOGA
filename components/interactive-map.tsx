"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail } from "lucide-react"

export default function InteractiveMap() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold">Visit Our Campus</h3>
        <div className="space-y-3">
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MapPin className="h-5 w-5 text-amber-600" />
            <div>
              <p className="font-medium">YogA Residential School</p>
              <p className="text-sm text-muted-foreground">123 Mountain View Road, Rishikesh, India</p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Phone className="h-5 w-5 text-amber-600" />
            <div>
              <p className="font-medium">+91 98765 43210</p>
              <p className="text-sm text-muted-foreground">Available 9 AM - 6 PM IST</p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Mail className="h-5 w-5 text-amber-600" />
            <div>
              <p className="font-medium">hello@yoga.example</p>
              <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="overflow-hidden rounded-lg border"
      >
        <iframe
          title="YogA Campus Location"
          className="h-64 w-full lg:h-full"
          src="https://www.openstreetmap.org/export/embed.html?bbox=77.55%2C12.9%2C77.7%2C13.0&layer=mapnik"
        />
      </motion.div>
    </div>
  )
}
