"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  User, 
  MapPin, 
  CreditCard, 
  Check, 
  Truck, 
  Lock, 
  Smartphone, 
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  RefreshCw
} from "lucide-react";

export default function CheckoutPage() {
  const { items: cartItems, clearCart } = useCart();
  const router = useRouter();

  // If cart is empty, redirect back to cart page (but wait for client mounting)
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems, router]);

  // Step state: 1 = Address, 2 = Order Summary, 3 = Payment
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Address Form State
  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
    type: "home" // home or work
  });
  const [addressErrors, setAddressErrors] = useState({});

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState("cod"); // upi, card, netbanking, cod
  const [upiProvider, setUpiProvider] = useState("gpay");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: ""
  });
  const [cardErrors, setCardErrors] = useState({});
  const [bankingBank, setBankingBank] = useState("sbi");

  // COD Captcha Verification Code
  const [captchaCode, setCaptchaCode] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  // Generate a random 3-digit security code for Cash on Delivery (like Flipkart)
  const generateCaptcha = () => {
    const code = Math.floor(100 + Math.random() * 900).toString();
    setCaptchaCode(code);
    setUserCaptchaInput("");
    setCaptchaError("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10.00 : 0;
  const taxes = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + taxes;

  // Handle address form changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));
    if (addressErrors[name]) {
      setAddressErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validate Address
  const validateAddress = () => {
    const errors = {};
    if (!addressForm.name.trim()) errors.name = "Name is required";
    if (!addressForm.phone.trim() || !/^\d{10}$/.test(addressForm.phone.trim())) {
      errors.phone = "Provide a valid 10-digit mobile number";
    }
    if (!addressForm.pincode.trim() || !/^\d{6}$/.test(addressForm.pincode.trim())) {
      errors.pincode = "Provide a valid 6-digit Pincode";
    }
    if (!addressForm.addressLine.trim()) errors.addressLine = "Address is required";
    if (!addressForm.city.trim()) errors.city = "City is required";
    if (!addressForm.state.trim()) errors.state = "State is required";

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Address Step
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (validateAddress()) {
      setCompletedSteps(prev => [...new Set([...prev, 1])]);
      setActiveStep(2);
    }
  };

  // Submit Order Summary Step
  const handleSummarySubmit = () => {
    setCompletedSteps(prev => [...new Set([...prev, 2])]);
    setActiveStep(3);
  };

  // Handle Card details changes
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "number") {
      formattedValue = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19);
    } else if (name === "expiry") {
      formattedValue = value.replace(/\//g, '').replace(/(\d{2})/g, '$1/').trim().substring(0, 5);
      if (formattedValue.endsWith("/")) formattedValue = formattedValue.slice(0, -1);
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, '').substring(0, 3);
    }
    setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
    if (cardErrors[name]) {
      setCardErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validate Card Details
  const validateCard = () => {
    const errors = {};
    const cleanNum = cardDetails.number.replace(/\s/g, "");
    if (cleanNum.length !== 16) errors.number = "Enter a valid 16-digit card number";
    if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) errors.expiry = "Expiry must be MM/YY";
    if (cardDetails.cvv.length !== 3) errors.cvv = "Enter 3-digit CVV";
    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Place Order Action
  const handlePlaceOrder = () => {
    // 1. Validation based on payment method
    if (paymentMethod === "card") {
      if (!validateCard()) return;
    }
    if (paymentMethod === "upi" && upiProvider === "custom" && !upiId.includes("@")) {
      alert("Please enter a valid UPI ID (e.g. name@okhdfc)");
      return;
    }
    if (paymentMethod === "cod") {
      if (userCaptchaInput !== captchaCode) {
        setCaptchaError("Incorrect security code. Please try again.");
        return;
      }
    }

    // 2. Build final order details
    const orderNumber = `FO-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalPaymentMethod = 
      paymentMethod === "cod" ? "Cash on Delivery" :
      paymentMethod === "upi" ? `UPI (${upiProvider === "custom" ? upiId : upiProvider.toUpperCase()})` :
      paymentMethod === "card" ? `Card (ending in ${cardDetails.number.slice(-4)})` :
      `Net Banking (${bankingBank.toUpperCase()})`;

    const orderData = {
      orderNumber,
      orderDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || "Aesthetic Handcrafted Creation",
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      shippingAddress: {
        name: addressForm.name,
        addressLine1: addressForm.addressLine,
        city: addressForm.city,
        state: addressForm.state,
        zip: addressForm.pincode,
        phone: addressForm.phone
      },
      paymentMethod: finalPaymentMethod,
      pricing: {
        subtotal,
        shipping,
        taxes,
        total
      }
    };

    // 3. Save order data and route to Order Confirmation
    localStorage.setItem("lastOrder", JSON.stringify(orderData));
    clearCart();
    router.push("/order-confirmation");
  };

  if (cartItems.length === 0) {
    return null; // Don't render while redirecting
  }

  return (
    <main className="bg-background text-foreground min-h-screen pt-20">
      <Navbar />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-10 text-center flex items-center justify-center gap-3">
          <ShieldCheck className="text-primary" size={32} /> Secure Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Left Area - 2 Cols (Multi-step checkout) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* STEP 1: DELIVERY ADDRESS */}
            <div className={`bg-card rounded-2xl border shadow-sm transition-all duration-300 overflow-hidden ${
              activeStep === 1 ? "border-primary ring-1 ring-primary/20" : "border-border"
            }`}>
              <div className={`px-6 py-4 flex items-center justify-between cursor-pointer ${
                activeStep !== 1 && completedSteps.includes(1) ? "bg-secondary/10" : ""
              }`}
              onClick={() => completedSteps.includes(1) && setActiveStep(1)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    completedSteps.includes(1) ? "bg-green-500 text-white" : "bg-primary text-primary-foreground"
                  }`}>
                    {completedSteps.includes(1) ? <Check size={16} /> : "1"}
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">DELIVERY ADDRESS</h2>
                    {completedSteps.includes(1) && activeStep !== 1 && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {addressForm.name} • {addressForm.addressLine}, {addressForm.city}
                      </p>
                    )}
                  </div>
                </div>
                {completedSteps.includes(1) && activeStep !== 1 && (
                  <button className="text-primary text-sm font-semibold hover:underline">CHANGE</button>
                )}
              </div>

              {activeStep === 1 && (
                <div className="p-6 border-t border-border bg-card">
                  <form onSubmit={handleAddressSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={addressForm.name}
                        onChange={handleAddressChange}
                        placeholder="Enter full name"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                      />
                      {addressErrors.name && <p className="text-xs text-primary mt-1">{addressErrors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">10-Digit Mobile Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={addressForm.phone}
                        onChange={handleAddressChange}
                        placeholder="e.g. 9876543210"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                      />
                      {addressErrors.phone && <p className="text-xs text-primary mt-1">{addressErrors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={addressForm.pincode}
                        onChange={handleAddressChange}
                        placeholder="6-digit pincode"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                      />
                      {addressErrors.pincode && <p className="text-xs text-primary mt-1">{addressErrors.pincode}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">City</label>
                      <input
                        type="text"
                        name="city"
                        value={addressForm.city}
                        onChange={handleAddressChange}
                        placeholder="City/Town"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                      />
                      {addressErrors.city && <p className="text-xs text-primary mt-1">{addressErrors.city}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Address (Area and Street)</label>
                      <textarea
                        name="addressLine"
                        value={addressForm.addressLine}
                        onChange={handleAddressChange}
                        placeholder="House No, Building Name, Road, Area"
                        rows="2"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
                      />
                      {addressErrors.addressLine && <p className="text-xs text-primary mt-1">{addressErrors.addressLine}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">State</label>
                      <input
                        type="text"
                        name="state"
                        value={addressForm.state}
                        onChange={handleAddressChange}
                        placeholder="e.g. Tamilnadu"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                      />
                      {addressErrors.state && <p className="text-xs text-primary mt-1">{addressErrors.state}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Address Type</label>
                      <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="radio"
                            name="type"
                            value="home"
                            checked={addressForm.type === "home"}
                            onChange={handleAddressChange}
                            className="text-primary accent-primary"
                          />
                          Home (All day delivery)
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="radio"
                            name="type"
                            value="work"
                            checked={addressForm.type === "work"}
                            onChange={handleAddressChange}
                            className="text-primary accent-primary"
                          />
                          Work (Delivery 10 AM - 5 PM)
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-2 pt-4 border-t border-border mt-4">
                      <button
                        type="submit"
                        className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold hover:bg-primary/95 transition shadow-md shadow-primary/10"
                      >
                        Save and Deliver Here
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* STEP 2: ORDER SUMMARY */}
            <div className={`bg-card rounded-2xl border shadow-sm transition-all duration-300 overflow-hidden ${
              activeStep === 2 ? "border-primary ring-1 ring-primary/20" : "border-border"
            }`}>
              <div className={`px-6 py-4 flex items-center justify-between cursor-pointer ${
                activeStep !== 2 && completedSteps.includes(2) ? "bg-secondary/10" : ""
              }`}
              onClick={() => completedSteps.includes(2) && setActiveStep(2)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    completedSteps.includes(2) ? "bg-green-500 text-white" : "bg-primary text-primary-foreground"
                  }`}>
                    {completedSteps.includes(2) ? <Check size={16} /> : "2"}
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">ORDER SUMMARY</h2>
                    {completedSteps.includes(2) && activeStep !== 2 && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {cartItems.length} {cartItems.length === 1 ? "item" : "items"} inside cart
                      </p>
                    )}
                  </div>
                </div>
                {completedSteps.includes(2) && activeStep !== 2 && (
                  <button className="text-primary text-sm font-semibold hover:underline">VIEW</button>
                )}
              </div>

              {activeStep === 2 && (
                <div className="p-6 border-t border-border bg-card space-y-4">
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-4 p-3 bg-secondary/20 rounded-xl border border-border/50">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border" />
                        <div className="flex-grow">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">${item.price.toFixed(2)} × {item.quantity}</p>
                        </div>
                        <div className="text-right font-bold text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border flex justify-end">
                    <button
                      onClick={handleSummarySubmit}
                      className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold hover:bg-primary/95 transition shadow-md shadow-primary/10"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 3: PAYMENT OPTIONS */}
            <div className={`bg-card rounded-2xl border shadow-sm transition-all duration-300 overflow-hidden ${
              activeStep === 3 ? "border-primary ring-1 ring-primary/20" : "border-border"
            }`}>
              <div className="px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h2 className="font-bold text-lg">PAYMENT OPTIONS</h2>
              </div>

              {activeStep === 3 && (
                <div className="p-6 border-t border-border bg-card space-y-6">
                  
                  {/* PAYMENT SELECTORS */}
                  <div className="space-y-4">
                    
                    {/* UPI Option */}
                    <div className={`border rounded-2xl p-4 transition cursor-pointer ${
                      paymentMethod === "upi" ? "border-primary bg-secondary/10" : "border-border"
                    }`}
                    onClick={() => setPaymentMethod("upi")}
                    >
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="upi"
                          checked={paymentMethod === "upi"}
                          onChange={() => setPaymentMethod("upi")}
                          className="accent-primary mt-1"
                        />
                        <div className="flex-grow">
                          <span className="font-bold block text-sm">BHIM UPI (GPay, PhonePe, Paytm)</span>
                          <span className="text-xs text-muted-foreground block mt-0.5">Pay instantly using your preferred UPI app</span>
                          
                          {paymentMethod === "upi" && (
                            <div className="mt-4 space-y-3 pt-3 border-t border-border/60" onClick={(e) => e.stopPropagation()}>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                                  <input type="radio" name="upiapp" value="gpay" checked={upiProvider === "gpay"} onChange={() => setUpiProvider("gpay")} className="accent-primary" />
                                  Google Pay
                                </label>
                                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                                  <input type="radio" name="upiapp" value="phonepe" checked={upiProvider === "phonepe"} onChange={() => setUpiProvider("phonepe")} className="accent-primary" />
                                  PhonePe
                                </label>
                                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                                  <input type="radio" name="upiapp" value="custom" checked={upiProvider === "custom"} onChange={() => setUpiProvider("custom")} className="accent-primary" />
                                  Other UPI ID
                                </label>
                              </div>

                              {upiProvider === "custom" && (
                                <input
                                  type="text"
                                  value={upiId}
                                  onChange={(e) => setUpiId(e.target.value)}
                                  placeholder="Enter UPI ID (e.g. username@upi)"
                                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </label>
                    </div>

                    {/* Card Option */}
                    <div className={`border rounded-2xl p-4 transition cursor-pointer ${
                      paymentMethod === "card" ? "border-primary bg-secondary/10" : "border-border"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                    >
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="accent-primary mt-1"
                        />
                        <div className="flex-grow">
                          <span className="font-bold block text-sm">Credit / Debit / ATM Card</span>
                          <span className="text-xs text-muted-foreground block mt-0.5">We accept Visa, Mastercard, RuPay, and Maestro</span>
                          
                          {paymentMethod === "card" && (
                            <div className="mt-4 grid grid-cols-3 gap-3 pt-3 border-t border-border/60" onClick={(e) => e.stopPropagation()}>
                              <div className="col-span-3">
                                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Card Number</label>
                                <input
                                  type="text"
                                  name="number"
                                  value={cardDetails.number}
                                  onChange={handleCardChange}
                                  placeholder="xxxx xxxx xxxx xxxx"
                                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
                                />
                                {cardErrors.number && <p className="text-[10px] text-primary mt-0.5">{cardErrors.number}</p>}
                              </div>
                              <div className="col-span-2">
                                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Expiry Date</label>
                                <input
                                  type="text"
                                  name="expiry"
                                  value={cardDetails.expiry}
                                  onChange={handleCardChange}
                                  placeholder="MM/YY"
                                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
                                />
                                {cardErrors.expiry && <p className="text-[10px] text-primary mt-0.5">{cardErrors.expiry}</p>}
                              </div>
                              <div className="col-span-1">
                                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">CVV</label>
                                <input
                                  type="password"
                                  name="cvv"
                                  value={cardDetails.cvv}
                                  onChange={handleCardChange}
                                  placeholder="***"
                                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
                                />
                                {cardErrors.cvv && <p className="text-[10px] text-primary mt-0.5">{cardErrors.cvv}</p>}
                              </div>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>

                    {/* Net Banking Option */}
                    <div className={`border rounded-2xl p-4 transition cursor-pointer ${
                      paymentMethod === "netbanking" ? "border-primary bg-secondary/10" : "border-border"
                    }`}
                    onClick={() => setPaymentMethod("netbanking")}
                    >
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="netbanking"
                          checked={paymentMethod === "netbanking"}
                          onChange={() => setPaymentMethod("netbanking")}
                          className="accent-primary mt-1"
                        />
                        <div className="flex-grow">
                          <span className="font-bold block text-sm">Net Banking</span>
                          <span className="text-xs text-muted-foreground block mt-0.5">Pay directly from your bank account</span>
                          
                          {paymentMethod === "netbanking" && (
                            <div className="mt-4 pt-3 border-t border-border/60" onClick={(e) => e.stopPropagation()}>
                              <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Select Bank</label>
                              <select
                                value={bankingBank}
                                onChange={(e) => setBankingBank(e.target.value)}
                                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
                              >
                                <option value="sbi">State Bank of India</option>
                                <option value="hdfc">HDFC Bank</option>
                                <option value="icici">ICICI Bank</option>
                                <option value="axis">Axis Bank</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>

                    {/* Cash on Delivery (COD) Option (Flipkart style with Captcha) */}
                    <div className={`border rounded-2xl p-4 transition cursor-pointer ${
                      paymentMethod === "cod" ? "border-primary bg-secondary/10" : "border-border"
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                    >
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="accent-primary mt-1"
                        />
                        <div className="flex-grow">
                          <span className="font-bold block text-sm flex items-center gap-1.5">
                            Cash on Delivery (COD) 
                            <span className="bg-green-500/10 text-green-600 text-[10px] px-1.5 py-0.5 rounded font-bold">Safe & Easy</span>
                          </span>
                          <span className="text-xs text-muted-foreground block mt-0.5">Pay in cash or UPI when your order is delivered</span>
                          
                          {paymentMethod === "cod" && (
                            <div className="mt-4 pt-4 border-t border-border/60 space-y-3" onClick={(e) => e.stopPropagation()}>
                              
                              <div className="bg-secondary/40 border border-secondary rounded-xl p-3 flex gap-2.5 text-xs text-secondary-foreground items-center">
                                <AlertCircle className="flex-shrink-0 text-primary" size={16} />
                                Please solve the verification code below to confirm your Cash on Delivery order.
                              </div>

                              <div className="flex items-center gap-3">
                                {/* Captcha Display box */}
                                <div className="bg-foreground text-background font-mono font-bold tracking-widest text-lg px-6 py-2.5 rounded-lg select-none flex items-center gap-2 shadow-inner">
                                  <span>{captchaCode}</span>
                                </div>
                                
                                <button
                                  type="button"
                                  onClick={generateCaptcha}
                                  className="p-2 hover:bg-muted text-muted-foreground rounded-lg transition-colors border border-border"
                                  title="Refresh security code"
                                >
                                  <RefreshCw size={16} />
                                </button>

                                <div className="flex-grow">
                                  <input
                                    type="text"
                                    value={userCaptchaInput}
                                    onChange={(e) => {
                                      setUserCaptchaInput(e.target.value.replace(/\D/g, ""));
                                      setCaptchaError("");
                                    }}
                                    placeholder="Enter Code"
                                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary font-mono text-center font-bold tracking-wider"
                                  />
                                </div>
                              </div>
                              {captchaError && <p className="text-xs text-primary font-semibold">{captchaError}</p>}
                            </div>
                          )}
                        </div>
                      </label>
                    </div>

                  </div>

                  {/* PLACE ORDER BUTTON */}
                  <div className="pt-4 border-t border-border">
                    <button
                      onClick={handlePlaceOrder}
                      className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/95 transition shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      <Lock size={18} />
                      Confirm & Place Order (${total.toFixed(2)})
                    </button>
                    <span className="block text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
                      <ShieldCheck size={12} className="text-green-500" />
                      100% Secure Payments Powered by Farah Origin
                    </span>
                  </div>

                </div>
              )}
            </div>

          </div>

          {/* Right Area - 1 Col (Price Details) */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm sticky top-28 space-y-6">
              <h3 className="font-bold text-xs font-semibold text-muted-foreground uppercase tracking-widest border-b border-border pb-3">Price Details</h3>
              
              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Price ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})</span>
                  <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-green-600">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Tax & GST (8%)</span>
                  <span className="font-semibold text-foreground">${taxes.toFixed(2)}</span>
                </div>

                <div className="border-t border-dashed border-border/80 my-3"></div>

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Savings/Discount Tag */}
              <div className="bg-green-500/10 border border-green-500/20 text-green-600 p-3 rounded-xl text-xs font-bold text-center">
                🎉 Special Offer: You saved $10.00 on delivery charges!
              </div>

              <div className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                <Truck size={16} className="text-primary flex-shrink-0" />
                Safe and Secure Payments. Easy returns. 100% Authentic products.
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
