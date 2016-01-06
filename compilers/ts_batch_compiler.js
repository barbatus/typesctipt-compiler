
TsBatchCompiler = class TsBatchCompiler extends TsBasicCompiler  {
  constructor(tsconfig) {
    super(tsconfig);
  }

  processFilesForTarget(files) {
    this.processFilesForTargetInternal(files);

    let tsFiles = files.filter(file => !this.isDeclarationFile(file));

    TypeScript.transpileFiles(tsFiles, {
      compilerOptions: this.tsconfig.compilerOptions,
      typings: this.tsconfig.typings,
      filePath: file => this.getAbsoluteImportPath(file),
      moduleName: file => this.getAbsoluteImportPath(file, true)
    }, (file, referencedPaths, diagnostics, result) => {
      this.processDiagnostics(file, diagnostics);

      file.addJavaScript(result);
    });
  }
}