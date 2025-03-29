"use client";
import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from 'next/link';
import { toast } from 'sonner';
import FormField from './FormField';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser, clearError } from '../Redux/slices/authslice';

const authFormSchema = (type) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    });
};

const AuthForm = ({ type }) => {
    const formSchema = authFormSchema(type);
    const router = useRouter();
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated,user } = useSelector(state => state.auth);
    console.log('Raw user object:', user);
    console.log('Stringified user:', JSON.stringify(user));
   
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    React.useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        
        if (isAuthenticated) {
            router.push("/");
        }
    }, [error, isAuthenticated, router, dispatch]);
     
    async function onSubmit(values) {
        try {
            if (type === "sign-up") {
                await dispatch(registerUser(values)).unwrap();
                toast.success("Account created successfully!");
            } else {
                await dispatch(loginUser(values)).unwrap();
                toast.success("Logged in successfully! ");
            }
        } catch (error) {
            console.error("Authentication error:", error);
        }
    }

    const isSignIn = type === "sign-in";
    
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="card-border lg:min-w-[566px] w-full max-w-md">
                <div className="flex flex-col gap-6 card py-14 px-10">
                    <div className="flex flex-row gap-2 justify-center">
                        <Image src="/logo.svg" alt="logo" height={32} width={38} />
                        <h2 className="text-primary-100">PrepWise</h2>
                    </div>

                    <h3 className="text-center">Practice job interviews with AI</h3>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full space-y-6 mt-4 form"
                        >
                            {!isSignIn && (
                                <FormField
                                    control={form.control}
                                    name="name"
                                    label="Name"
                                    placeholder="Your Name"
                                    type="text"
                                />
                            )}

                            <FormField
                                control={form.control}
                                name="email"
                                label="Email"
                                placeholder="Your email address"
                                type="email"
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                            />

                            <Button className="btn w-full" type="submit" disabled={loading}>
                                {loading ? "Processing..." : isSignIn ? "Sign In" : "Create an Account"}
                            </Button>
                        </form>
                    </Form>

                    <p className="text-center">
                        {isSignIn ? "No account yet?" : "Have an account already?"}
                        <Link
                            href={!isSignIn ? "/sign-in" : "/sign-up"}
                            className="font-bold text-user-primary ml-1"
                        >
                            {!isSignIn ? "Sign In" : "Sign Up"}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;