"use client"

import SignatureCanvas from "react-signature-canvas"
import { useRef, useState } from "react"
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
    DrawerHeader,
    DrawerDescription
  } from "@/components/ui/drawer"

import { PenSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useAction } from "next-safe-action/hooks"
// Previously: Imported the old saveSignatureAction, which expected a full job object.
// Change: Updated to import the new saveSignatureAction.
// Purpose: Aligns with the new server action that only requires jobId and signatureDataUrl.
import { saveSignatureAction } from "@/app/actions/saveSignatureAction"
import { toast } from "sonner"
import { updateSignatureSchemaType } from "@/zod-schemas/signature"

export default function SignatureComponent(job: updateSignatureSchemaType) {
  
  const sigCanvas = useRef<SignatureCanvas>(null)
  const [dataUrl, setDataUrl] = useState(job.signature)
  const [openDrawer, setOpenDrawer] = useState(false)
  
  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  const handleClear = () => {
    if(!sigCanvas.current) {
      return
    }
    sigCanvas.current.clear()
  }

  const {
    execute: saveSignature
  } = useAction(saveSignatureAction, {
            onSuccess({ data }) {
                console.log(data)
                toast(data?.message)
            },
            onError({ error }) {
                console.log(error)
                toast.error("Save Failed")
            }
        })

  // Previously: Set trimmedDataUrl, called saveSignature with the entire job object, then toggled drawer and cleared canvas.
  // Change: Get dataUrl synchronously, set trimmedDataUrl, call saveSignature with only { jobId, signatureDataUrl }, then close drawer and clear canvas.
  // Purpose: Ensures the latest signature is sent to the server action, avoids async state issues, and aligns with the new action's input requirements.
  const handleSave = () => {
    if (!sigCanvas.current) {
      return
    }
    if (!job.id) {
      toast.error("Job ID is missing");
      return;
    }
    const dataUrl = sigCanvas.current.getCanvas().toDataURL('image/png')
    setDataUrl(dataUrl)
    saveSignature({ id: job.id, signature: dataUrl })
    setOpenDrawer(false)
    sigCanvas.current.clear()
  }

  return(
    <div>
      <div className="flex justify-between mt-6 lg:mt-10 lg:mx-6 px-6">

        <div className="min-w-1/2">
          <div className="flex gap-2 max-w-3/4">
            <p className="lg:text-2xl mt- text-nowrap">Accpted By:</p>
            {dataUrl ? <img alt='signature' src={dataUrl}/> : null}
          </div>
          <div className="flex gap-2">
            <p className="lg:text-2xl mt-2">Accepted Date:</p>
            {dataUrl ? <p className="lg:text-2xl mt-2">{new Date().toLocaleString('en-US', {year: 'numeric', month:'long', day:'numeric'}).toString()}</p> : null}
          </div>
        </div>

        <div>
          <Drawer open={openDrawer} dismissible={false}>
            <DrawerTrigger asChild>
              <Button asChild className="bg-one drop-shadow-lg drop-shadow-gray-800 w-15 h-15" onClick={handleDrawer}>
                <PenSquare size={32}/>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Signature</DrawerTitle>
                <DrawerDescription>Sign here to indicate that you accept the terms of the esitmate.</DrawerDescription>
              </DrawerHeader>
              <div>
                <div className="border-2 w-lvw h-40">
                  <SignatureCanvas ref={sigCanvas}
                  canvasProps={{className: "w-full h-full"}}
                  />
                </div>
                <div className="flex justify-center gap-4 my-4">
                  <Button onClick={handleClear} className="bg-two">Clear</Button>
                  <Button onClick={handleSave} className="bg-one">Submit</Button>
                  <Button onClick={handleDrawer}>Exit</Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  )
}