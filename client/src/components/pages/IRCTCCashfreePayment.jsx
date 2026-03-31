import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { load } from '@cashfreepayments/cashfree-js';

const IRCTCCashfreePayment = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('Initializing payment...');
    const [error, setError] = useState(null);

    const paymentSessionId = searchParams.get('payment_session_id');
    const orderId = searchParams.get('order_id');
    const amount = searchParams.get('amount');
    const currency = searchParams.get('currency') || 'INR';

    useEffect(() => {
        if (!paymentSessionId) {
            setError('Missing payment session ID. Please check the URL.');
            setStatus('Error');
            return;
        }

        const triggerPayment = async () => {
            try {
                const cashfree = await load({
                    mode: 'production'
                });

                const checkoutOptions = {
                    paymentSessionId: paymentSessionId,
                    redirectTarget: '_self', 
                };

                await cashfree.checkout(checkoutOptions);
                setStatus('Redirecting to secure payment gateway...');
            } catch (err) {
                console.error('Payment initialization error:', err);
                setError('Failed to initiate payment. Please try again or contact support.');
                setStatus('Error');
            }
        };

        triggerPayment();
    }, [paymentSessionId]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="p-8 bg-white rounded-2xl shadow-xl border border-red-100 text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/1000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Error</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full bg-gray-900 text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98]"
                    >
                        Retry Payment
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFDFF]">
            <div className="p-10 bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] text-center max-w-md w-full border border-gray-50">
                {/* Modern Loader */}
                <div className="relative w-20 h-20 mx-auto mb-8">
                    <div className="absolute inset-0 border-4 border-blue-50 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">{status}</h1>
                <p className="text-gray-500 mb-8 text-lg">Securely processing your transaction</p>
                
                <div className="space-y-4 pt-6 border-t border-gray-50 text-left">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Order ID</span>
                        <span className="text-gray-900 font-mono text-sm bg-gray-50 px-2 py-1 rounded">{orderId || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Amount</span>
                        <span className="text-gray-900 font-bold text-lg">{currency} {amount || '0.00'}</span>
                    </div>
                </div>

                <div className="mt-10 flex items-center justify-center space-x-2 text-gray-400 text-xs font-semibold uppercase tracking-widest">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>SSL Secure Payment</span>
                </div>
            </div>
        </div>
    );
};

export default IRCTCCashfreePayment;
