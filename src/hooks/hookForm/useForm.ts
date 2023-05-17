import { useState, useCallback } from 'react';

import { Submit, Event, EventTextarea, ITypeInput, Form } from './interface';

export const useForm = <T, K extends keyof T>(): Form<T, K> => {
	const [model, setModel] = useState<T>({} as T);
	const [errors, setErrors] = useState<K[]>([]);
	const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

	const handleSubmit =
		(onSubmit: Submit<T>) =>
		(e: Event): void => {
			e.preventDefault();

			onSubmit(model);
		};

	const handleChange = (e: Event, setForm: (state: T) => void, form: T): void => {

		const { checked, value, name, type, id } = e.target;

		const dict: ITypeInput = {
			radio: id,
			checkbox: checked,
		};

		setModel({
			...model,
			[name]: dict[type] ?? value,
		});

		setForm({
			...form,
			...model,
			[name]: dict[type] ?? value,
		});
	};

	const handleChangeTextarea = (e: EventTextarea, setForm: (state: T) => void, form: T): void => {

		const { value, name } = e.target;

		setModel({
			...model,
			[name]: value,
		});

		setForm({
			...form,
			...model,
			[name]: value,
		});
	};

	const handleChangeFile = (e: Event, setForm: (state: T) => void, form: T): void => {

		const { files, name } = e.target;
		const [file] = files ?? [];
		const reader = new FileReader();
		reader.readAsDataURL(file);

		setModel({
			...model,
			[name]: file,
		});

		setForm({
			...form,
			...model,
			[name]: file,
		});

		setImagePreview("");

		reader.onload = function(e) {
			setImagePreview(reader.result);
		};

		reader.onerror = function() {

			console.log(reader.error);
			setImagePreview(null);
		};
	};

	const setSelect = (name: string, value: string | number | boolean, setForm: (state: T) => void, form: T): void => {
		setModel({
			...model,
			[name]: value,
		});

		setForm({
			...form,
			...model,
			[name]: value,
		});
	};

	const setValuesDefault = useCallback(
		(name: keyof T, value: number | string | boolean | {}): void => {
			setModel(model => ({ ...model, [name]: value }));
		},
		[]
	);

	const validateFields = useCallback(
		(model: T, fieldRequerids: K[]): boolean => {
			const fields = fieldRequerids.filter(
				field => model[field] === '' || model[field] === undefined
			);

			setErrors(fields);

			return fields.length > 0;
		},
		[]
	);

	return {
		handleSubmit,
		handleChange,
		handleChangeTextarea,
		handleChangeFile,
		setValuesDefault,
		validateFields,
		errors,
		setSelect,
		model,
		setModel,
		imagePreview,
		setImagePreview,
	};
};