import Card from "./Card.tsx";
import { cardCategories as allCategories } from "../utils/cardCategories.ts";
import { AppUser } from "../utils/types.ts";
import { useEffect, useState } from "preact/hooks";
import { CreateLanguageCardDto } from "../utils/types.ts";
import { JSXInternal } from "https://esm.sh/v94/preact@10.11.0/src/jsx.d.ts";
import { Spinner } from "../components/Navigation/Icons.tsx";
import { h } from "preact";
interface CardCreatorProps {
  user: AppUser;
}

export default function CardCreator(props: CardCreatorProps) {
  const [card, setCard] = useState<CreateLanguageCardDto>({
    sourceLangText: "",
    targetLangText: "",
    targetLangTranscription: "",
    category: "",
    authorEmail: props.user.email,
  });

  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [responseOk, setResponseOk] = useState<boolean | undefined>(undefined);

  const clearFields = () => {
    setCard({
      ...card,
      sourceLangText: "",
      targetLangText: "",
      targetLangTranscription: "",
    });
  };

  const onSubmit = async (
    e: JSXInternal.TargetedEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setAwaitingResponse(true);
    const response = await fetch(`/api/submitcard`, {
      method: "POST",
      body: JSON.stringify(card),
    });
    clearFields();
    setAwaitingResponse(false);

    setResponseOk(!!(await response.json()).insertedId);
  };

  const onInput = (
    e:
      | JSXInternal.TargetedEvent<HTMLInputElement, Event>
      | JSXInternal.TargetedEvent<HTMLSelectElement, Event>,
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    if (responseOk != undefined) {
      setTimeout(() => {
        setResponseOk(undefined);
      }, 3000);
    }
  }, [responseOk]);

  return (
    <div class="w-full h-full flex justify-around items-center flex-wrap-reverse text-gray-200 text-opacity-50 font-mono text-sm">
      <FlashMessage
        visible={responseOk == true}
        success={true}
      >
        Success!
      </FlashMessage>
      <FlashMessage
        visible={responseOk == false}
        success={false}
      >
        Card submission failed, sorry"
      </FlashMessage>
      <form
        class="p-2 flex flex-col justify-around items-center rounded
        sm:(h-[60vh] w-[33vw]) h-[65vh] w-[95vw]"
        onSubmit={onSubmit}
      >
        <Input
          name="sourceLangText"
          label="Original"
          value={card.sourceLangText}
          onInput={onInput}
        />
        <Input
          name="targetLangText"
          label="Translation"
          value={card.targetLangText}
          onInput={onInput}
        />
        <Input
          name="targetLangTranscription"
          label="Transcription"
          value={card.targetLangTranscription}
          onInput={onInput}
        />
        <Select
          name="category"
          label="Category"
          options={allCategories}
          onInput={onInput}
        />
        <input hidden type="text" name="authorEmail" value={props.user.email} />
        <button
          disabled={awaitingResponse}
          class="m-1 p-3 max-w-max
            bg-white bg-opacity-20
            rounded-2xl shadow
            hover:(shadow-2xl bg-opacity-50)
            active:(bg-opacity-80)
            transition-all duration-300"
        >
          {awaitingResponse ? <Spinner /> : "Submit"}
        </button>
      </form>
      <div class="relative p-7 flex items-center justify-center flex-col sm:(h-[60vh] w-[33vw]) h-[30vh] w-[60vw] rounded">
        <div class="absolute left-3 top-1">
          <span class="text-xl font-bold text-red-500 animate-pulse align-middle">
            •
          </span>{" "}
          preview
        </div>
        <Card
          flipVisibility={false}
          card={card}
        />
      </div>
    </div>
  );
}

const Input = (
  props: {
    name: string;
    label: string;
    value: string;
    onInput: JSXInternal.GenericEventHandler<HTMLInputElement>;
  },
) => {
  return (
    <div class="m-1 p-2 flex justify-between items-center w-full">
      <label class="mr-10 my-auto" for={props.name}>
        {props.label}
      </label>
      <input
        required
        class="appearance-none py-2 px-1 min-w-[15vw]
          bg-gray-600
          border(1 gray-200 opacity-20) rounded 
          focus:(glow-yellow border(1 yellow-200 opacity-20))
          transition-all duration-300"
        type="text"
        name={props.name}
        id={props.name}
        value={props.value}
        onInput={props.onInput}
      />
    </div>
  );
};

const Select = (
  props: {
    name: string;
    label: string;
    options: string[];
    onInput: JSXInternal.GenericEventHandler<HTMLSelectElement>;
  },
) => {
  return (
    <div class="m-1 p-2 flex justify-between items-center w-full">
      <label class="mr-10 my-auto" for={props.name}>{props.label}</label>
      <select
        required
        class="appearance-auto py-2 px-1 min-w-[15vw]
          bg-gray-600 
          border(1 gray-200 opacity-20) rounded 
          focus:(glow-yellow border(1 yellow-200 opacity-20))
          transition-all duration-300"
        name={props.name}
        id={props.name}
        onInput={props.onInput}
      >
        <option class="hidden" selected disabled></option>
        {props.options.map((option) => <option value={option}>{option}
        </option>)}
      </select>
    </div>
  );
};

const FlashMessage = (
  props: {
    visible: boolean;
    success: boolean;
    children: h.JSX.Element | h.JSX.Element[] | string;
  },
) => {
  return (
    <div
      class={`fixed top-20 z-30
          flex justify-center items-center
          text-${props.success ? "green" : "red"}-500 text-opacity-50
          transition-all duration-300
          opacity-${props.visible ? "100" : "0"}`}
    >
      {props.children}
    </div>
  );
};
