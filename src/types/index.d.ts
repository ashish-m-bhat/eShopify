// Allows TS to recognize different files as modules


declare module "*.module.css" {
    export const content: {[className: string]: string};
}

declare module '*.module.less' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '@ashish-m-bhat/*';
