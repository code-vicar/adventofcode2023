export interface ICubeSet {
    red: number;
    green: number;
    blue: number;
}

export interface ISample {
    id: number;
    cubeSubsets: ICubeSet[];
}

export interface ISamplePossibleTestResult {
    isPossible: boolean;
    sampleId: number;
}

export interface ISampleMinimumSetResult {
    minSet: ICubeSet;
    sampleId: number;
}

export interface IGameResults {
    cubeSet: ICubeSet;
    results: ISamplePossibleTestResult[];
}

export interface IGame2Results {
    cubeSet: ICubeSet;
    results: ISampleMinimumSetResult[];
}
