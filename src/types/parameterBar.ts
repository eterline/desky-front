type UnitPrefix = "GB" | "MB" | "%" | "B";

interface ParameterBarProps {
    icon:           string;
    descriprion?:   string;

    upperValue:     number;
    actualValue?:   number;

    prefix?:        UnitPrefix;
    color?:         string;
}