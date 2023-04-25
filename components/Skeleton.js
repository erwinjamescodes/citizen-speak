import { Card, Skeleton, Stack } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

const SkeletonPost = () => {
  const Cards = () => {
    const [isLessThan600] = useMediaQuery("(max-width: 600px)");
    const skeletonPosts = [];
    for (let i = 0; i < 4; i++) {
      skeletonPosts.push(
        <Card className="max-w-[1100px] w-[100%]" p={8} mb={4}>
          <Stack width="full">
            <Skeleton
              height="10px"
              width={isLessThan600 ? "50%" : "25%"}
              mb={4}
            />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Stack direction={"row"} pt="4">
              <Skeleton height="20px" width={isLessThan600 ? "25%" : "25%"} />
            </Stack>
          </Stack>
        </Card>
      );
    }
    return skeletonPosts;
  };
  return <Cards />;
};

export default SkeletonPost;
