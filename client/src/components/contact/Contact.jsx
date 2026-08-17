import { Box, styled, Typography, Link, Stack, Button } from "@mui/material";
import { GitHub, Instagram, Email, LinkedIn, ArrowForward } from "@mui/icons-material";

const Banner = styled(Box)`
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.55)),
    url(http://mrtaba.ir/image/bg2.jpg);
  width: 100%;
  height: 45vh;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  padding: 30px;
  box-sizing: border-box;
`;

const BannerText = styled(Typography)`
  color: #fff;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
`;

const Wrapper = styled(Box)`
  padding: 30px 20px;
  max-width: 720px;
  margin: 0 auto;
`;

const Text = styled(Typography)`
  color: #666;
  line-height: 1.7;
  margin-top: 16px;
`;

const IconLink = styled(Link)`
  color: #555;
  display: inline-flex;
  align-items: center;
  transition:
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    color: #1976d2;
    transform: translateY(-2px);
  }
`;
const Button1 = styled(Button)`
  margin-top: 30px;
  padding: 11px 22px;
  border-radius: 10px;
  text-transform: none;
  font-size: 1rem;
  font-weight: 600;

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(25, 118, 210, 0.25);
  }
`;

const Contact = () => {
  return (
    <Box>
      <Banner>
        <BannerText variant="h3">Get In Touch</BannerText>
      </Banner>

      <Wrapper>
        <Typography variant="h4" fontWeight={600}>
          Getting in touch is easy!
        </Typography>

        <Text variant="h6" fontWeight={400}>
          Have a project in mind, a question, or just want to say hi? I'm always
          happy to connect. Reach out through any of the channels below and I'll
          get back to you as soon as I can.
        </Text>

        <Stack direction="row" spacing={3} mt={4}>
          <IconLink
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub fontSize="large" />
          </IconLink>

          <IconLink
            href="https://www.linkedin.com/in/visty"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn fontSize="large" />
          </IconLink>

          <IconLink
            href="https://www.instagram.com/visty.exe"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram fontSize="large" />
          </IconLink>

          <IconLink
            href="mailto:vishal.tyagi14oct@gmail.com@gmail.com?subject=Let's connect"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Email fontSize="large" />
          </IconLink>
        </Stack>
        <Button1
          variant="contained"
          endIcon={<ArrowForward />}
          href="https://contact-beige-sigma.vercel.app/"
        >
          Help & Feedback
        </Button1>
      </Wrapper>
    </Box>
  );
};

export default Contact;
