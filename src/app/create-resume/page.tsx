import { EditorToolbar } from "../components/EditorToolbar/EditorToolbar";
import Form from "../components/Form/Form";
import Preview from "../components/Preview/Preview";
import { TemplateInitializer } from "../components/TemplateInitializer/TemplateInitializer";
import { Suspense } from "react";

const CreateResume = () => {
  return (
    <div className="page-bg flex h-[calc(100dvh-var(--header-height))] min-h-0 flex-col overflow-hidden">
      <Suspense fallback={null}>
        <TemplateInitializer />
      </Suspense>
      <div className="mx-auto flex w-full max-w-7xl shrink-0 flex-col overflow-visible px-4 pt-4 pb-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="section-label">Editor</p>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
              Build your resume
            </h1>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              Changes sync to your preview in real time.
            </p>
          </div>
          <EditorToolbar />
        </div>
      </div>

      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col px-4 pb-4 sm:px-6 lg:px-8">
        <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-2 gap-4 lg:gap-5 xl:grid-cols-2 xl:grid-rows-1">
          <div className="card-surface flex min-h-0 flex-col overflow-hidden">
            <div className="panel-header">
              <span className="section-label !normal-case !tracking-normal text-[11px]">
                Your details
              </span>
            </div>
            <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6">
              <Form />
            </div>
          </div>

          <div className="flex min-h-0 flex-col overflow-hidden">
            <Preview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResume;
