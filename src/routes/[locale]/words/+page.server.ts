import { redirect } from '@sveltejs/kit';

export const actions = {
	async default({ request, params }) {
		const formData = await request.formData();
		const query = formData.get('query') as string;
		throw redirect(302, `/${params.locale}/words/${query}`);
	}
};
