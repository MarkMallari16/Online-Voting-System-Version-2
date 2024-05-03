import React from 'react'
import toast, { ToastBar, Toaster } from 'react-hot-toast'

const CustomToast = () => {
    return (
        <Toaster position="top-right">
            {(t) => (
                <ToastBar toast={t} style={{

                    padding: 10
                }}>

                    {({ icon, message }) => (
                        <>
                            {icon}
                            {message}
                            {t.type !== 'loading' && (
                                <button onClick={() => toast.dismiss(t.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>


                                </button>
                            )}
                        </>
                    )}
                </ToastBar>
            )}
        </Toaster>
    )
}

export default CustomToast