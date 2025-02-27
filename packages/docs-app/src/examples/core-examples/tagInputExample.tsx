/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";

import { Button, H5, Intent, Switch, TagInput, type TagProps } from "@blueprintjs/core";
import { Example, type ExampleProps, handleBooleanChange } from "@blueprintjs/docs-theme";

import { IntentSelect } from "./common/intentSelect";

const INTENTS = [Intent.NONE, Intent.PRIMARY, Intent.SUCCESS, Intent.DANGER, Intent.WARNING];

const VALUES = [
    // supports single JSX elements
    <strong key="al">Albert</strong>,
    // supports JSX "fragments" (don't forget `key` on elements in arrays!)
    ["Bar", <em key="thol">thol</em>, "omew"],
    // and supports simple strings
    "Casper",
    // falsy values are not rendered and ignored by the keyboard
    undefined,
];

export interface TagInputExampleState {
    addOnBlur: boolean;
    addOnPaste: boolean;
    autoResize: boolean;
    disabled: boolean;
    fill: boolean;
    intent: Intent;
    large: boolean;
    leftIcon: boolean;
    tagIntents: boolean;
    tagMinimal: boolean;
    values: React.ReactNode[];
}

export class TagInputExample extends React.PureComponent<ExampleProps, TagInputExampleState> {
    public state: TagInputExampleState = {
        addOnBlur: false,
        addOnPaste: true,
        autoResize: false,
        disabled: false,
        fill: false,
        intent: "none",
        large: false,
        leftIcon: true,
        tagIntents: false,
        tagMinimal: false,
        values: VALUES,
    };

    private handleAddOnBlurChange = handleBooleanChange(addOnBlur => this.setState({ addOnBlur }));

    private handleAddOnPasteChange = handleBooleanChange(addOnPaste => this.setState({ addOnPaste }));

    private handleAutoResizeChange = handleBooleanChange(autoResize => this.setState({ autoResize }));

    private handleDisabledChange = handleBooleanChange(disabled => this.setState({ disabled }));

    private handleFillChange = handleBooleanChange(fill => this.setState({ fill }));

    private handleIntentChange = (intent: Intent) => this.setState({ intent });

    private handleLargeChange = handleBooleanChange(large => this.setState({ large }));

    private handleLeftIconChange = handleBooleanChange(leftIcon => this.setState({ leftIcon }));

    private handleTagIntentsChange = handleBooleanChange(tagIntents => this.setState({ tagIntents }));

    private handleTagMinimalChange = handleBooleanChange(tagMinimal => this.setState({ tagMinimal }));

    public render() {
        const { tagIntents, tagMinimal, values, ...props } = this.state;

        const clearButton = (
            <Button
                disabled={props.disabled}
                icon={values.length > 1 ? "cross" : "refresh"}
                minimal={true}
                onClick={this.handleClear}
            />
        );

        // define a new function every time so switch changes will cause it to re-render
        // NOTE: avoid this pattern in your app (use this.getTagProps instead); this is only for
        // example purposes!!
        const getTagProps = (_v: React.ReactNode, index: number): TagProps => ({
            intent: tagIntents ? INTENTS[index % INTENTS.length] : Intent.NONE,
            large: props.large,
            minimal: tagMinimal,
        });

        return (
            <Example options={this.renderOptions()} {...this.props}>
                <TagInput
                    {...props}
                    leftIcon={this.state.leftIcon ? "user" : undefined}
                    onChange={this.handleChange}
                    placeholder="Separate values with commas..."
                    rightElement={clearButton}
                    tagProps={getTagProps}
                    values={values}
                />
            </Example>
        );
    }

    private renderOptions() {
        return (
            <>
                <H5>Appearance props</H5>
                <Switch label="Large" checked={this.state.large} onChange={this.handleLargeChange} />
                <Switch label="Disabled" checked={this.state.disabled} onChange={this.handleDisabledChange} />
                <Switch label="Left icon" checked={this.state.leftIcon} onChange={this.handleLeftIconChange} />
                <Switch label="Fill container width" checked={this.state.fill} onChange={this.handleFillChange} />
                <IntentSelect intent={this.state.intent} onChange={this.handleIntentChange} />
                <H5>Behavior props</H5>
                <Switch label="Add on blur" checked={this.state.addOnBlur} onChange={this.handleAddOnBlurChange} />
                <Switch label="Add on paste" checked={this.state.addOnPaste} onChange={this.handleAddOnPasteChange} />
                <Switch label="Auto resize" checked={this.state.autoResize} onChange={this.handleAutoResizeChange} />
                <H5>Tag props</H5>
                <Switch
                    label="Use minimal tags"
                    checked={this.state.tagMinimal}
                    onChange={this.handleTagMinimalChange}
                />
                <Switch
                    label="Cycle through intents"
                    checked={this.state.tagIntents}
                    onChange={this.handleTagIntentsChange}
                />
            </>
        );
    }

    private handleChange = (values: React.ReactNode[]) => {
        this.setState({ values });
    };

    private handleClear = () => this.handleChange(this.state.values.length > 0 ? [] : VALUES);
}
