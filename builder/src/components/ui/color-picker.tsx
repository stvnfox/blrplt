"use client"

import React, { useState } from "react"
import { Paintbrush } from "lucide-react"

import { cn } from "@/lib/utils"
import { colorOptions } from "@/lib/settings/options"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function PickerExample() {
    const [background, setBackground] = useState("#B4D455")

    return (
        <div
            className="preview flex h-full min-h-[350px] w-full items-center justify-center rounded !bg-cover !bg-center p-10 transition-all"
            style={{ background }}
        >
            <ColorPicker
                background={background}
                setBackground={setBackground}
            />
        </div>
    )
}

export function ColorPicker({
    background,
    setBackground,
    className,
    isDisabled,
}: {
    background: string | undefined
    setBackground: (background: string) => void
    className?: string
    isDisabled?: boolean
}) {
    const uniqueColorOptions = Array.from(new Set(colorOptions))

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    disabled={isDisabled}
                    className={cn(
                        "block w-[220px] justify-start text-left font-normal shadow-none",
                        !background && "text-muted-foreground",
                        className
                    )}
                >
                    <div className="flex w-full items-center gap-2">
                        {background ? (
                            <div
                                className="h-4 w-4 rounded !bg-cover !bg-center transition-all"
                                style={{ background }}
                            ></div>
                        ) : (
                            <Paintbrush className="h-4 w-4" />
                        )}
                        <div className="flex-1 truncate">{background ? background : "Pick a color"}</div>
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 pr-1">
                <div>
                    <div className="mb-2 flex h-[300px] flex-wrap gap-1 overflow-auto">
                        {uniqueColorOptions.map((colorObj) => (
                            <div
                                key={colorObj.color}
                                className="mb-1"
                            >
                                <h3 className="mb-1 text-sm font-medium lowercase">
                                    {colorObj.color.charAt(0).toUpperCase() + colorObj.color.slice(1)}
                                </h3>
                                <div className="flex flex-wrap gap-x-1 gap-y-1">
                                    {Object.entries(colorObj.shades).map(([shade, hex]) => (
                                        <div
                                            key={hex}
                                            style={{ background: hex }}
                                            className="h-9 w-9 cursor-pointer rounded-md border hover:scale-105 active:scale-105 transition-transform"
                                            onClick={() => setBackground(hex)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Input
                    id="custom"
                    value={background}
                    className="col-span-2 mt-4 h-8"
                    onChange={(e) => setBackground(e.currentTarget.value)}
                />
            </PopoverContent>
        </Popover>
    )
}
