"use client";

import { FormEvent, useState } from "react";
import Animate from "@/components/animate";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="border-t border-gray-200 py-24 dark:border-gray-800">
      <div className="mx-auto max-w-xl px-6">
        <Animate>
          <h2 className="mb-4 text-center text-3xl font-bold">Get in Touch</h2>
        </Animate>
        <Animate delay={100}>
          <p className="mb-12 text-center text-gray-500 dark:text-gray-400">
            Have a question or want to work together? Send me a message.
          </p>
        </Animate>

        {submitted ? (
          <Animate>
            <p className="text-center text-indigo-600 dark:text-indigo-400">
              Thanks for reaching out! I&apos;ll get back to you soon.
            </p>
          </Animate>
        ) : (
          <Animate delay={200}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm text-gray-600 dark:text-gray-300">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm text-gray-600 dark:text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm text-gray-600 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
              >
                Send Message
              </button>
            </form>
          </Animate>
        )}
      </div>
    </section>
  );
}
