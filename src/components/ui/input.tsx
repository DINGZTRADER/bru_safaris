import * as React from "react";import {cn} from "@/lib/utils";
export function Input({className,type,...props}:React.ComponentProps<"input">){return <input type={type} className={cn("h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15",className)} {...props}/>}
