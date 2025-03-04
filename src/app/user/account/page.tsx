"use client";

import PageContent from "@/components/common/PageContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, IdCard, Lock, ReceiptText, Share2 } from "lucide-react";
import AccountGeneral from "./AccountGeneral";
import AccountSecurity from "./AccountSecurity";
import AccountBilling from "./AccountBIlling";
import AccountSocialLinks from "./AccountSocialLinks";
import AccountNotifications from "./AccountNotifications";
import { useDialog } from "@/hooks/use-dialog";
import { AccountContext } from "./AccountContext";
import { useState } from "react";
import "./account.css";

export default function UserAccount() {
  const tabs = [
    {
      name: "general",
      label: "General",
      icon: IdCard,
    },
    {
      name: "billing",
      label: "Billing",
      icon: ReceiptText,
    },
    {
      name: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      name: "socialLinks",
      label: "Social Links",
      icon: Share2,
    },
    {
      name: "security",
      label: "Security",
      icon: Lock,
    },
  ];

  const user = {
    avatar: "/assets/images/avatar/avatar-1.webp",
    cover: "/assets/images/cover/cover-1.webp",
    name: "Afrika Kemi",
    role: "Developer frontend",
  };

  const addPaymentMethodDialog = useDialog(false);
  const addAddressDialog = useDialog(false);
  const addressBookDialog = useDialog(false);
  const paymentMethodDialog = useDialog(false);

  const [defaultAddress, setDefaultAddress] = useState<any>({
    name: "Lucian Obrien",
    type: "Office",
    address: "1147 Rohan Drive Suite 819 - Burlington, VT / 82021",
    phone: "+1 416-555-0198",
  });

  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<any>({
    type: "mastercard",
    currentBalance: 50000,
    cardHolder: "Afrika Kemi",
    expiration: "12/25",
    cardNumber: "4312324595843214",
  });

  return (
    <PageContent
      title="Profile"
      links={{ User: "/", "Afrika Kemi": "#" }}
      className="max-w-6xl"
    >
      <AccountContext.Provider
        value={{
          addPaymentMethodDialog,
          addAddressDialog,
          addressBookDialog,
          paymentMethodDialog,
          defaultAddress,
          setDefaultAddress,
          defaultPaymentMethod,
          setDefaultPaymentMethod,
        }}
      >
        <Tabs defaultValue="general" className="mt-4">
          <div className="flex">
            <TabsList className="bg-white w-auto grid p-0 m-0  grid-cols-5 gap-4">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={`tab${tab.name}`}
                  value={tab.name}
                  className="rounded-none py-2 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 px-0"
                >
                  <div className=" flex items-center gap-2">
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="mt-12 mb-24">
            <TabsContent value="general">
              <AccountGeneral />
            </TabsContent>
            <TabsContent value="billing">
              <AccountBilling />
            </TabsContent>
            <TabsContent value="notifications">
              <AccountNotifications />
            </TabsContent>
            <TabsContent value="socialLinks">
              <AccountSocialLinks />
            </TabsContent>
            <TabsContent value="security">
              <AccountSecurity />
            </TabsContent>
          </div>
        </Tabs>
      </AccountContext.Provider>
    </PageContent>
  );
}
