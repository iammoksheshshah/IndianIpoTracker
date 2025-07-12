import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { SEOHead } from "@/components/seo-head";
import { PAGE_SEO } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContact) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <>
      <SEOHead metadata={PAGE_SEO.contact} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100">Get in touch with our team for any questions or support</p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h4 className="text-xl font-semibold mb-6">Get in Touch</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <i className="fas fa-envelope text-blue-600 w-6 mr-3"></i>
                    <span>support@nextipo.in</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-phone text-blue-600 w-6 mr-3"></i>
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt text-blue-600 w-6 mr-3"></i>
                    <span>Mumbai, Maharashtra, India</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-blue-600 w-6 mr-3"></i>
                    <span>Monday - Friday, 9:00 AM - 6:00 PM IST</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h5 className="font-semibold mb-4">Frequently Asked Questions</h5>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div>
                      <strong>Q: How often is IPO data updated?</strong>
                      <p>A: Our IPO data is updated in real-time throughout market hours.</p>
                    </div>
                    <div>
                      <strong>Q: Can I apply for IPOs through your platform?</strong>
                      <p>A: We provide information and links to official application portals. Applications must be done through authorized channels.</p>
                    </div>
                    <div>
                      <strong>Q: Is the premium calculation accurate?</strong>
                      <p>A: We provide the most accurate premium calculations based on live market data.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-6">Send us a Message</h4>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        {...form.register("name")}
                        className="mt-2"
                        placeholder="Your full name"
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        className="mt-2"
                        placeholder="your.email@example.com"
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        {...form.register("message")}
                        rows={4}
                        className="mt-2"
                        placeholder="How can we help you?"
                      />
                      {form.formState.errors.message && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.message.message}</p>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane mr-2"></i>
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
