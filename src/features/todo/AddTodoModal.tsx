import * as React from "react"
import useMediaQuery from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { RiAddLargeFill } from "react-icons/ri";
import AddTodo from "./AddTodo"


export function AddTodoModalForm() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (

    <Modal>
      {/* Add a new Todo Button on Destop */}
        <ModalTrigger className="bg-[#050c9c] p-7 items-center gap-2 rounded-[30px] absolute right-24 top-[29.5rem] dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
            <RiAddLargeFill className="h-8 w-8" />
            <h1>Add a new Todo</h1>
        </ModalTrigger>
        <ModalBody>
          <ModalContent className="dark:bg-[#252525]">
            <AddTodo />
          </ModalContent>
        </ModalBody>
    </Modal>

    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* Add a new Todo Button on Mobile */}
      <DrawerTrigger className="bg-[#050c9c] p-7 items-center gap-2 rounded-[30px] absolute right-10 top-[23rem] dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
        <RiAddLargeFill className="h-8 w-8" />
        <h1 className="">Add a new Todo</h1>
      </DrawerTrigger>
      <DrawerContent className="dark:bg-[#252525]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="">
          </DrawerTitle>
          <AddTodo />
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

