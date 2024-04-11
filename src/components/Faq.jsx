import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

// props.items - [{}, {}, {}]
function Faq(props) {
  return (
    <div className="flex flex-col gap-y-4 bg-indigo-100 rounded-lg p-2">
      {props.items.map((item) => (
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className=" px-4 items-center bg-indigo-600 flex justify-between py-2 hover:bg-indigo-800 w-full rounded-md text-white font-bold">
                <span>{item.title}</span>
                <ChevronUpIcon
                  className={`${open ? "rotate-180 transform" : ""} h-6 w-6 `}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="text-gray-500 w-full px-4 py-4">
                {item.description}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

export default Faq;
