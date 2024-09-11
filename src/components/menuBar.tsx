import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useColor } from "@/context/color-provider";

export default function MenuBar() {
  const { color, toggleColor } = useColor();

  function handleColorChange(value: string) {
    toggleColor(value);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">⚙️</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>Choose your color!</SheetDescription>
          <RadioGroup
            defaultValue="option-one"
            className="flex flex-col gap-3"
            onValueChange={handleColorChange}
            value={color}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bg-teal-400" id="bg-teal-400" />
              <Label htmlFor="bg-teal-400">Teal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bg-stone-400" id="bg-stone-400" />
              <Label htmlFor="bg-stone-400">Stone</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bg-indigo-400" id="bg-indigo-400" />
              <Label htmlFor="bg-indigo-400">Indigo</Label>
            </div>
          </RadioGroup>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
