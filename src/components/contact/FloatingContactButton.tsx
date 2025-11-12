import { useState, useEffect } from "react";
import { MessageCircle, X, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const FloatingContactButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check mobile view
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        if (isOpen) {
            const handleClickOutside = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                if (!target.closest('.floating-contact-container')) {
                    setIsOpen(false);
                }
            };
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isOpen]);
    
    const contacts = [
        {
            name: 'Chat Messenger',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.912 1.448 5.511 3.713 7.212V22l3.46-1.9c.924.254 1.903.39 2.827.39 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm.994 12.464l-2.56-2.73-5 2.73 5.5-5.838 2.622 2.73 4.938-2.73-5.5 5.838z"/>
                </svg>
            ),
            link: 'https://www.facebook.com/share/17B1qUh7p3/',
            bgColor: 'bg-[#0084FF] hover:bg-[#0073E6]',
        },
        {
            name: 'Chat Zalo',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 48 48">
                    <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 36c-8.837 0-16-7.163-16-16S15.163 8 24 8s16 7.163 16 16-7.163 16-16 16z"/>
                    <path d="M32.7 14.5l-3.234 10.268-7.466-3.968L15.3 33.5l3.234-10.268 7.466 3.968z"/>
                </svg>
            ),
            link: 'https://zalo.me/0972068334',
            bgColor: 'bg-[#0068FF] hover:bg-[#0057E6]',
        },
        {
            name: 'Hotline',
            icon: <Phone className="w-5 h-5" />,
            link: 'tel:0972068334',
            bgColor: 'bg-green-600 hover:bg-green-700',
            label: '0972 068 334'
        },
        {
            name: 'Email',
            icon: <Mail className="w-5 h-5" />,
            link: 'mailto:dongbeo16@gmail.com',
            bgColor: 'bg-red-600 hover:bg-red-700',
        },
    ];

    // Mobile Version
    if (isMobile) {
        return (
            <div className="floating-contact-container">
                {/* Backdrop */}
                {isOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* Contact Panel */}
                <div className={cn(
                    "fixed bottom-0 left-0 right-0 z-50",
                    "bg-white rounded-t-3xl shadow-2xl",
                    "transition-transform duration-300 ease-out",
                    isOpen ? "translate-y-0" : "translate-y-full"
                )}>
                    <div className="p-6 pb-8">
                        {/* Handle bar */}
                        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                        
                        <h3 className="text-lg font-bold mb-4 text-center text-gray-800">
                            Liên hệ với chúng tôi
                        </h3>
                        
                        <div className="grid grid-cols-2 gap-3">
                            {contacts.map((contact, index) => (
                                <a
                                    key={index}
                                    href={contact.link}
                                    target={contact.link.startsWith('http') ? '_blank' : '_self'}
                                    rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                    className={cn(
                                        "flex flex-col items-center gap-2 p-4 rounded-xl",
                                        "transition-transform duration-200 active:scale-95",
                                        contact.bgColor,
                                        "text-white font-medium text-sm shadow-md"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        {contact.icon}
                                    </div>
                                    <span className="text-xs text-center">
                                        {contact.label || contact.name}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "fixed bottom-4 right-4 z-50",
                        "w-14 h-14 rounded-full shadow-lg",
                        "flex items-center justify-center",
                        "transition-all duration-300 transform",
                        isOpen ? "scale-100" : "scale-100 hover:scale-110",
                        "bg-gradient-to-r from-blue-600 to-blue-700",
                        "text-white"
                    )}
                    aria-label="Toggle contact options"
                >
                    {isOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <>
                            <MessageCircle className="w-6 h-6" />
                            {/* Notification badge */}
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                                4
                            </span>
                        </>
                    )}
                </button>

                {/* Pulse Animation */}
                {!isOpen && (
                    <div className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-blue-600 animate-ping opacity-20 pointer-events-none z-40" />
                )}
            </div>
        );
    }

    // Desktop Version
    return (
        <div className="floating-contact-container fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Contact Options */}
            <div className={cn(
                "flex flex-col gap-3 transition-all duration-300",
                isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            )}>
                {contacts.map((contact, index) => (
                    <a
                        key={index}
                        href={contact.link}
                        target={contact.link.startsWith('http') ? '_blank' : '_self'}
                        rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-full shadow-lg",
                            "transition-all duration-200 transform hover:scale-105 hover:shadow-xl",
                            "text-white font-medium text-sm",
                            contact.bgColor,
                            "group relative"
                        )}
                        style={{
                            animationDelay: `${index * 50}ms`
                        }}
                    >
                        {/* Icon */}
                        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                            {contact.icon}
                        </div>
                        
                        {/* Label */}
                        <span className="whitespace-nowrap">
                            {contact.label || contact.name}
                        </span>

                        {/* Hover effect */}
                        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    </a>
                ))}
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-14 h-14 rounded-full shadow-lg relative",
                    "flex items-center justify-center",
                    "transition-all duration-300 transform hover:scale-110",
                    "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
                    "text-white",
                    isOpen && "rotate-180"
                )}
                aria-label="Toggle contact options"
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <>
                        <MessageCircle className="w-6 h-6" />
                        {/* Notification badge */}
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md">
                            4
                        </span>
                    </>
                )}
            </button>

            {/* Pulse Animation khi đóng */}
            {!isOpen && (
                <div className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-blue-600 animate-ping opacity-20 pointer-events-none" />
            )}

            {/* Tooltip */}
            {!isOpen && (
                <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Nhấn để liên hệ
                    <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                </div>
            )}
        </div>
    );
};

export default FloatingContactButton;