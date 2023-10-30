import {
  aProject,
  aProjectContent,
} from "../../src/.generated/mocks/carbonProjects.mocks";

export const projectContent = aProjectContent({});

export const project = aProject({});

// Generated types are wrong, id is string - https://github.com/KlimaDAO/klimadao/issues/1500
export const carbonProject = {
  ...project,
  // override these because the type from aProject() is wrong
  content: projectContent,
};
