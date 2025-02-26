import React from "react";

interface VisaCardProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv?: string;
}

const VisaCard: React.FC<VisaCardProps> = ({
  cardNumber,
  cardHolder,
  expiryDate,
  cvv,
}) => {
  return (
    <div className="relative w-96 h-56 bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl shadow-2xl text-white p-6 transform transition-transform hover:scale-105">
      {/* Visa Logo */}
      <div className="absolute top-6 right-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
          alt="Visa Logo"
          className="h-8"
        />
      </div>

      {/* Card Number */}
      <div className="mt-12 text-2xl font-mono tracking-widest">
        {cardNumber.replace(/(\d{4})/g, "$1 ").trim()}
      </div>

      {/* Card Holder and Expiry Date */}
      <div className="flex justify-between mt-6 text-sm">
        <div>
          <p className="text-xs text-gray-300">Card Holder</p>
          <p className="uppercase">{cardHolder}</p>
        </div>
        <div>
          <p className="text-xs text-gray-300">Expires</p>
          <p>{expiryDate}</p>
        </div>
      </div>

      {/* CVV (Optional) */}
      {cvv && (
        <div className="absolute bottom-6 right-6 text-sm">
          <p className="text-xs text-gray-300">CVV</p>
          <p>{cvv}</p>
        </div>
      )}
    </div>
  );
};

export default VisaCard;
