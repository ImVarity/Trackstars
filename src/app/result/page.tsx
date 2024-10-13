'use client'

import { useEffect, useState } from "react"
import { Phone } from 'lucide-react'

import { contact, ContactList } from "../contacts/contact-list"

export default function Page () {
    const [location, setLocation] = useState<string>("Seattle, Washington")
    const [instructions, setInstructions] = useState<string>(
        "This is where your text will go. The box has a sleek design with clean lines, rounded corners, and a soft gradient background. You can add more content here to suit your needs."
    )
    const [phoneArray, setPhoneArray] = useState<contact[]>(
      ContactList
    )
    
    useEffect(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
        let loc = localStorage.getItem("location") || "";
        setLocation(loc)
        let generatedText = localStorage.getItem("generatedText") || "";
        setInstructions(generatedText);
      }
    }, []);

    return (
        <div className="flex flex-col w-full h-screen bg-white items-center justify-center">
            {
                phoneArray.map((c) => {
                    return (
                        <div key={c.phone}>
                            <AlertBox ct={c} />
                        </div>
                    )
                })
            }
            <ModernBox bodyText={instructions} location={location}/>
        </div>
    )
}

function AlertBox({ ct }: { ct: contact }) {
    return (
      <div className="w-[25rem] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 animate-shake">
        <div className="flex flex-row justify-between">
          <div>
          <p className="font-bold">
            Alerting {ct.name}
            <span className="dot animate-jump1">.</span>
            <span className="dot animate-jump2">.</span>
            <span className="dot animate-jump3">.</span>
          </p>
            <i>{ct.phone}</i>
          </div>
          <div className="flex flex-row items-center">
            <Phone className="animate-ring" /> {/*Wiggle animation */}
          </div>
        </div>
      </div>
    );
  }

function ModernBox ({bodyText, location} : {bodyText: string, location: string}) {
    return (
      <div className="flex justify-center items-center mt-2">
        <div className="h-[30rem] w-[25rem] bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 shadow-lg rounded-lg p-6 text-center">
            <p className="text-black text-xs mb-3">
                <b>{location}</b>
            </p>
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">
                Instructions
            </h1>
            <div className="h-[20rem] flex flex-col items-center text-gray-600">
                <p className="h-[18rem] w-[20rem] text-ellipsis overflow-hidden">{bodyText}</p>
                <b className="text-xl">...</b>
            </div>

        </div>
      </div>
    );
  }