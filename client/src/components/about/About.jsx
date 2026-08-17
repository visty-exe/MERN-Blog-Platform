import { Box, styled, Typography, Link, Stack } from '@mui/material';
import { GitHub, Instagram, Email, LinkedIn } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.55)),
        url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80);
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
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
        color: #1976d2;
        transform: translateY(-2px);
    }
`;

const About = () => {
    return (
        <Box>
            <Banner>
                <BannerText variant="h3">Vishal Tyagi</BannerText>
            </Banner>

            <Wrapper>
                <Typography variant="h4" fontWeight={600}>
                    About Me
                </Typography>

                <Text variant="h6" fontWeight={400}>
                    I'm a Software Engineer based in India, working across full-stack
                    web development, mobile app QA, and Android development. I enjoy
                    building things end-to-end — from React frontends to Node.js
                    backends — and testing them thoroughly along the way.
                </Text>

                <Text variant="h6" fontWeight={400}>
                    Interested in what I've built? Check out my projects on GitHub.
                </Text>

                <Text variant="h6" fontWeight={400}>
                    Want to collaborate or just say hi? Reach out below.
                </Text>

                <Stack direction="row" spacing={3} mt={4}>
                    <IconLink
                        href="https://github.com/visty-exe"
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
                        href="mailto:your-vishal.tyagi14oct@gmail.com?subject=Let's connect"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Email fontSize="large" />
                    </IconLink>
                </Stack>
            </Wrapper>
        </Box>
    );
};

export default About;