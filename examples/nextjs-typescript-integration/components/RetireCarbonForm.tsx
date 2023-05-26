"use client";
import { Pool } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  FireIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Spinner } from "./Spinner";

export function RetireCarbonForm(props: {
  defaultQuantity: number;
  projectTokenAddress: string;
  pool: Pool;
}) {
  const router = useRouter();
  const [modalState, setModalState] = useState<
    null | "pending" | "success" | "error"
  >(null);
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [retirementMessage, setRetirementMessage] = useState("");
  const [retirementUrl, setRetirementUrl] = useState("");

  const handleSubmit = async () => {
    setModalState("pending");
    try {
      // const res = await fetch("/api/provide-services/retire", {
      const res = await fetch("/api/retire", {
        method: "POST",
        body: JSON.stringify({
          beneficiaryName,
          retirementMessage,
          quantity: props.defaultQuantity,
          pool: props.pool,
          projectTokenAddress: props.projectTokenAddress,
        }),
        headers: {
          Authorization: "",
        },
      });
      if (!res.ok) {
        setModalState("error");
      } else {
        const { url } = await res.json();
        router.prefetch(url); // Give the page a head-start to generate
        setRetirementUrl(url);
        setModalState("success");
      }
    } catch (e) {
      setModalState("error");
    }
  };

  const handleCloseModal = () => {
    if (modalState === "pending") return;
    setModalState(null);
    setBeneficiaryName("");
    setRetirementMessage("");
  };

  return (
    <>
      <form
        className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Beneficiary name
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={beneficiaryName}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setBeneficiaryName(e.target.value)}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Retirement message
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={retirementMessage}
              maxLength={120}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setRetirementMessage(e.target.value)}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity to retire (tonnes)
          </label>
          <div className="mt-1">
            <input
              type="text"
              maxLength={120}
              name="message"
              id="message"
              className="text-gray-500 font-semibold block w-full rounded-md border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50"
              value={props.defaultQuantity}
              disabled={true}
            />
            <p className="text-xs font-medium mt-1 text-gray-500">
              Fixed to 1 kilogram for demo purposes
            </p>
          </div>
        </div>

        <div className="sm:col-start-2 sm:col-end-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50 disabled:bg-indigo-600"
            disabled={!beneficiaryName || !retirementMessage}
          >
            <FireIcon className="w-6" /> Retire Carbon
          </button>
        </div>
      </form>
      <Transition.Root show={modalState !== null} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div
                      className={classNames(
                        "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100",
                        {
                          "bg-indigo-100": modalState === "pending",
                          "bg-red-100": modalState === "error",
                        }
                      )}
                    >
                      {modalState === "pending" && <Spinner />}
                      {modalState === "success" && (
                        <CheckIcon className="w-6 text-green-900" />
                      )}
                      {modalState === "error" && (
                        <XCircleIcon className="w-6 text-red-900" />
                      )}
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {modalState === "pending"
                          ? "Processing transaction"
                          : modalState === "error"
                          ? "Error"
                          : "Retirement successful"}
                      </Dialog.Title>
                      <div className="mt-2">
                        {modalState === "pending" && (
                          <p className="text-sm text-gray-500">
                            Please wait a few seconds while the blockchain
                            verifies your retirement transaction.
                          </p>
                        )}
                        {modalState === "error" && (
                          <p className="text-sm text-gray-500">
                            Something went wrong. Please double check your
                            inputs and try again.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {modalState === "success" && (
                    <div className="mt-5 sm:mt-6">
                      <Link href={retirementUrl} target="_blank">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          View Retirement
                          <ArrowTopRightOnSquareIcon className="w-4 ml-2 self-center" />
                        </button>
                      </Link>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
