// src\app\web\(nursing)\atiteas\vista\exam\(layout)\partials\dispatcher\QuestionTypes.tsx
'use client';

import type { StrataSessionQuestionFull } from "@/lib/hooks/nexus/strata/assessment/learning/exams/live/useLiveStrataExamsHook";

import { SingleChoiceQuestion } from "../questiontypes/singleChoice";
import { MultipleSelectQuestion } from "../questiontypes/multipleSelect";
import { TrueFalseQuestion } from "../questiontypes/trueFalse";
import { NumericResponseQuestion } from "../questiontypes/numericResponse";
import { MatchingQuestion } from "../questiontypes/matching";
import { OrderingNumberQuestion } from "../questiontypes/orderingNumber";
import { OrderingItemQuestion } from "../questiontypes/orderingItem";
import { OrderingDragDropQuestion } from "../questiontypes/orderingDragDrop";
import { DynamicImageQuestion } from "../questiontypes/dynamicImage";
import { MultipleImageQuestion } from "../questiontypes/multipleImage";
import { BlankSelectQuestion } from "../questiontypes/blankSelect";
import { BlankFillQuestion } from "../questiontypes/blankFill";
import { HotspotQuestion } from "../questiontypes/hotspot";
import { EssayQuestion } from "../questiontypes/essay";
import { OpenEndedQuestion } from "../questiontypes/openEnded";
import { CaseBasedQuestion } from "../questiontypes/caseBased";
import { CaseBasedDropDownQuestion } from "../questiontypes/caseBasedDropDown";
import { CaseBasedHighLightQuestion } from "../questiontypes/caseBasedHighLight";
import { CaseBasedCheckBoxQuestion } from "../questiontypes/caseBasedCheckBox";
import { CaseBasedDynamicDnDQuestion } from "../questiontypes/caseBasedDynamicDnD";
import { CaseBasedDistinctDnDQuestion } from "../questiontypes/caseBasedDistinctDnD";
import { CaseBasedStratifiedDnDQuestion } from "../questiontypes/caseBasedStratifiedDnD";

const normalize = (type?: string) =>
  (type ?? "").toLocaleLowerCase().trim();

// Exam/Section context passed from the section renderer above
export interface QuestionRenderContext {
  examId: number;
  examGuidId: string;
  sectionId: number;
  sectionGuidId: string;
}

class QuestionRendererRegistry {
  render(
    q: StrataSessionQuestionFull,
    questionNumber?: number,
    mode?: string,
    ctx?: QuestionRenderContext   // optional so nothing else breaks
  ) {
    const type = normalize(q.type);

    // only singlechoice and multipleselect need ctx for now;
    // the rest stay unchanged until you wire them up
    const shared = {
      examId: ctx?.examId ?? 0,
      examGuidId: ctx?.examGuidId ?? "",
      sectionId: ctx?.sectionId ?? 0,
      sectionGuidId: ctx?.sectionGuidId ?? "",
    };

    switch (type) {

      case "":

      // Note "{...shared}" just "unpacks" all the keys of the object as individual props. Saves you repeating those four lines on every single case in the switch.
      case "singlechoice":
        return <SingleChoiceQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "multipleselect":
        return <MultipleSelectQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "truefalse":
        return <TrueFalseQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "numericresponse":
        return <NumericResponseQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "matching":
        return <MatchingQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "orderingnumber":
        return <OrderingNumberQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "orderingitem":
        return <OrderingItemQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "orderingdragdrop":
        return <OrderingDragDropQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "dynamicimage":
        return <DynamicImageQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "multipleimage":
        return <MultipleImageQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "blankselect":
        return <BlankSelectQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "blankfill":
        return <BlankFillQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "hotspot":
        return <HotspotQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "essay":
        return <EssayQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "openended":
        return <OpenEndedQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "casebased":
        return <CaseBasedQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "casebaseddropdown":
        return <CaseBasedDropDownQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "casebasedhighlight":
        return <CaseBasedHighLightQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "casebasedcheckbox":
        return <CaseBasedCheckBoxQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "casebaseddynamicdraganddrop":
        return <CaseBasedDynamicDnDQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "casebaseddistinctdraganddrop":
        return <CaseBasedDistinctDnDQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      case "casebasedstratifieddraganddrop":
        return <CaseBasedStratifiedDnDQuestion key={q.id} q={q} questionNumber={questionNumber} mode={mode} {...shared} />;

      default:
        return (
          <div key={q.id} className="p-3 border-b text-sm text-gray-400">
            Unsupported Type: {q.type}
          </div>
        );
    }
  }
}

export const QuestionTypes = new QuestionRendererRegistry();