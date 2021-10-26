export type CoreMods = Record<string, CoreMod>

export type CoreMod = TypedCoreMod<CoreModClassTarget | CoreModClassesTarget, ClassNode> | TypedCoreMod<CoreModFieldTarget, FieldNode> | TypedCoreMod<CoreModMethodTarget, MethodNode>

interface TypedCoreMod<TARGET, TRANSFORM> {
    target: TARGET;
    transformer: (value: TRANSFORM) => TRANSFORM
}

export interface CoreModClassTarget {
    type: 'CLASS';
    name: string;
}

export interface CoreModClassesTarget {
    type: 'CLASS';
    names: Array<string>;
}

export interface CoreModFieldTarget {
    type: 'METHOD';
    class: string;
    fieldName: string;
}

export interface CoreModMethodTarget {
    type: 'METHOD';
    class: string;
    methodName: string;
    methodDesc: string;
}

// This class is not directly accessible by CoreMods but passed
// when transforming classes. So it needs to be manually defined here.
export interface ClassNode extends ClassVisitor {

    version: number;
    access: number;
    name: string;
    signature: string | null;
    superName: string | null;
    interfaces: Array<string>;
    sourceFile: string | null;
    sourceDebug: string | null;
    module: never | null;
    outerClass: string | null;
    outerMethod: string | null;
    outerMethodDesc: string | null;
    visibleAnnotations: Array<Java_org_objectweb_asm_tree_AnnotationNode> | null;
    invisibleAnnotations: Array<Java_org_objectweb_asm_tree_AnnotationNode> | null;
    visibleTypeAnnotations: Array<TypeAnnotationNode> | null;
    invisibleTypeAnnotations: Array<TypeAnnotationNode> | null;
    attrs: Array<Attribute> | null;
    innerClasses: Array<unknown>;
    nestHostClass: string | null;
    nestMembers: Array<string> | null;
    permittedSubclasses: Array<string> | null;
    recordComponents: Array<unknown> | null;
    fields: Array<FieldNode>;
    methods: Array<MethodNode>;

    check(api: number): void;
}
