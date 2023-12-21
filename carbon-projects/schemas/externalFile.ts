export default {
	name: 'externalFile',
	type: 'array',
	title: 'External file',
	of: [
		{
			type: 'string',
            title: 'File name',
            name: 'filename',
		},
		{
			type: 'url',
            title: 'URI',
            name: 'uri',
		},
		{
			type: 'string',
            title: 'Description or Caption',
            name: 'description',
		},
		{
			type: 'string',
            title: 'MIME Type',
            name: 'mimetype',
		},
	]
};