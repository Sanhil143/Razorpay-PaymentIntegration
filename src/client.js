  const checkoutHandler = async (amount, currency) => {
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("currency", currency);
    const { data: order } = await axios.post(
      "https://localhost:3000/payment/paymentCheckout ",
      formData
    );
    const options = {
      key: process.env.RAZORPAY_API_KEY,
      amount: toString(order?.r[0]?.order?.amount),
      actualAmount: order?.r[0]?.order?.amount / 100,
      couponId: order?.r[0]?.CouponId,
      currency: order?.r[0]?.order?.currency,
      courseId: 1,
      packageId: 1,
      userId: localStorage.getItem("UserID"),
      email: "sanhil@gmail.com",
      name: "sanhil",
      description: "Get Package ",
      image: "https://avatars.githubusercontent.com/u/25058652?v=4",
      order_id: order?.r[0]?.order?.id,
      handler: async function (response) {
        const data = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          amount: order?.r[0]?.order?.amount,
          currency: order?.r[0]?.order?.currency,
          // Method: 'upi',
          userId: localStorage.getItem("UserID"),
          email: "sanhil@gmail.com",
          order_id: order?.r[0]?.order?.id,
        };
        console.log(response);

        const callback_url = await axios.post(
          "https://wiraaback.azurewebsites.net/api/v1/payment/paymentVerification",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert(callback_url.data.msg);
      },
      // callback_url: "https://wiraaback.azurewebsites.net/api/v1/payment/paymentVerification",
      prefill: {
        name: "sanhil",
        email: "sanhil@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };
  