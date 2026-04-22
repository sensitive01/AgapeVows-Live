{
  test: /EmployerCandidate\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: {
          localIdentName: '[local]',
        },
      },
    },
  ],
  include: path.resolve(__dirname, 'src/pages/employer'),
}