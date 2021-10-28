import { cardCategories as allCategories } from "../utils/cardCategories.ts";
import { AppUser } from "../utils/types.ts";
interface CardCreatorProps {
  user: AppUser;
}

export default function CardCreator(props: CardCreatorProps) {
  return (
    <form class="max-w-4xl h-full flex flex-col justify-center">
      <Input name="sourceLangText" label="Original" />
      <Input name="targetLangText" label="Translation" />
      <Input name="targetLangTranscription" label="Transcription" />
      <Select name="category" label="Category" options={allCategories} />
      <input hidden type="text" name="authorEmail" value={props.user.email} />
      <button
        class="m-3 p-3
            bg-gray-200 bg-opacity-0
            rounded-2xl
            hover:(shadow-2xl bg-opacity-20)
            active:(bg-opacity-80)
            transition-all duration-300"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

const Input = (props: { name: string; label: string }) => {
  return (
    <div class="m-3 p-3 flex justify-between items-center">
      <label class="mr-10 my-auto" for={props.name}>{props.label}</label>
      <input
        required
        class="appearance-none py-2 px-1 min-w-[15vw]
          bg-gray-600
          border(1 gray-200 opacity-20) rounded 
          focus:(shadow-xl border(1 gray-200 opacity-80))
          transition-all duration-300"
        type="text"
        name={props.name}
        id={props.name}
        value=""
      />
    </div>
  );
};

const Select = (props: { name: string; label: string; options: string[] }) => {
  return (
    <div class="m-3 p-3 flex justify-between items-center">
      <label class="mr-10 my-auto" for={props.name}>{props.label}</label>
      <select
        required
        class="appearance-auto py-2 px-1 min-w-[15vw]
          bg-gray-600
          border(1 gray-200 opacity-20) rounded 
          focus:(shadow-xl border(1 gray-200 opacity-80))
          transition-all duration-300"
        name={props.name}
        id={props.name}
      >
        <option class="hidden" selected disabled></option>
        {props.options.map((option) => <option value={option}>{option}
        </option>)}
      </select>
    </div>
  );
};
