import { TriModel, getTriAppConfig } from '@tririga/tririga-react-components';

let appModel: TriModel | null = null;

export function createAppModel(onError?: (err: any) => void): TriModel {
  const { modelAndView, instanceId } = getTriAppConfig();
  // @ts-expect-error - TriModel types might differ slightly in strict mode vs JS
  appModel = new TriModel(modelAndView, instanceId, onError);
  return appModel!;
}

export function getAppModel(): TriModel | null {
  return appModel;
}
