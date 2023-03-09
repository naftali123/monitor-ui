import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export type CopyrightProps = {
  href?: string;
  lable?: string;
  typographyProps?: any
}

export default function Copyright({ 
  href = 'https://mui.com/', 
  lable = 'Your Website', 
  typographyProps 
}: CopyrightProps) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...typographyProps}>
      {'Copyright © '}
      <Link color="inherit" href={ href }>
        { lable }
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
