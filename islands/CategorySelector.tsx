import { JSXInternal } from "https://esm.sh/v94/preact@10.11.0/src/jsx.d.ts";
import { useEffect, useState } from "preact/hooks";
import { cardCategories as allCategories } from "../utils/cardCategories.ts";
import DropdownOption from "./DropdownOption.tsx";
interface CategorySelectorProps {
  onActiveCategoryChange: (a: string[]) => void;
}

export default function CategorySelector(props: CategorySelectorProps) {
  const [selectedItems, setSelectedItems] = useState(allCategories);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const allCategoriesSelected = allCategories.length == selectedItems.length;
  const anyCategoriesSelected = selectedItems.length > 0;

  const dropdownContentScale = dropdownOpen ? "100" : "0";
  const labelOpacity = allCategoriesSelected ? "20" : "80";
  const labelColour = allCategoriesSelected
    ? "gray-200"
    : anyCategoriesSelected
    ? "yellow-200"
    : "red-500";

  const selectedCount = allCategoriesSelected
    ? "all"
    : anyCategoriesSelected
    ? selectedItems.join(", ")
    : `¯\\_(ツ)_/¯`;

  const onToggle = (e: JSXInternal.TargetedEvent<HTMLInputElement, Event>) => {
    const target = e.target as HTMLInputElement;
    const selected = target?.checked;
    if (selected) {
      setSelectedItems([
        ...new Set([
          ...selectedItems,
          target.name,
        ]),
      ]);
    } else {
      console.log("removing: " + target.name);
      setSelectedItems(selectedItems.filter((item) => item !== target.name));
    }
  };

  const selectAll = () => {
    setSelectedItems(allCategories);
  };

  const deselectAll = () => {
    setSelectedItems([]);
  };

  useEffect(() => {
    console.log("categories change in child! new: " + selectedItems);
    props.onActiveCategoryChange(selectedItems);
  }, [selectedItems]);

  return (
    <div class="m-1 sm:max-w-sm max-w-[15rem] truncate">
      <input
        hidden
        checked={dropdownOpen}
        onInput={(e) =>
          setDropdownOpen((e.target as HTMLInputElement)?.checked)}
        id={`showDropdown-input`}
        type="checkbox"
      />
      <label
        class={`text-${labelColour} text-opacity-${labelOpacity}
                hover:text-opacity-50 
                transition-all duration-300`}
        for={`showDropdown-input`}
      >
        Categories: {selectedCount}
      </label>
      <div
        class={`scale-${dropdownContentScale} fixed bg-gray-900 bg-opacity-20 z-10 h-screen w-screen top-0 left-0 flex justify-center content-center`}
        onClick={() => setDropdownOpen(false)}
      >
        <div
          class={`scale-${dropdownContentScale} bg-gray-900 min-w-[40vw] max-h-[60vh] z-20 transition-all m-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          <div class="max-h-[40vh] overflow-auto">
            {allCategories.map((category) => (
              <DropdownOption
                checked={selectedItems.includes(category)}
                optionName={category}
                onInput={onToggle}
              />
            ))}
          </div>
          <hr class="opacity-20" />
          <DropdownOption
            checked={!allCategoriesSelected}
            optionName="Select all"
            onInput={selectAll}
          />
          <DropdownOption
            checked={anyCategoriesSelected}
            optionName="Clear"
            onInput={deselectAll}
          />
        </div>
      </div>
    </div>
  );
}
