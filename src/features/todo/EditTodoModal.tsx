import * as React from "react";
import useMediaQuery from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { FaEdit } from "react-icons/fa";
import EditTodo from "./EditTodo";
import { Todo } from "@/types";

interface EditTodoModalFormProps {
  todo: Todo;
  onSave: (updatedTodo: Todo) => void;
}

export function EditTodoModalForm({ todo, onSave }: EditTodoModalFormProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleSave = (updatedTodo: Todo) => {
    onSave(updatedTodo);
    setOpen(false); // Close the modal/drawer after saving
  };

  const handleCancel = () => {
    setOpen(false); // Close the modal/drawer without saving
  };

  if (isDesktop) {
    return (
      <Modal>
        {/* Edit Todo Button for Desktop */}
        
        <ModalTrigger className="text-blue-500 hover:text-blue-700">
          <FaEdit className="h-8 w-8" />
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <EditTodo todo={todo} onCancel={handleCancel} onSave={handleSave} />
          </ModalContent>
        </ModalBody>
      </Modal>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* Edit Todo Button for Mobile */}
      <DrawerTrigger className="text-blue-500 hover:text-blue-700">
        <FaEdit className="h-8 w-8" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          {/* <DrawerTitle>Edit Todo</DrawerTitle> */}
        </DrawerHeader>
        <EditTodo todo={todo} onCancel={handleCancel} onSave={handleSave} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
