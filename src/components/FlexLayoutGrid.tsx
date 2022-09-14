import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import { DataGrid } from "@mui/x-data-grid";

const FlexLayoutGrid: React.FC<any> = ({ questions }) => {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            sx={{
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
              border: 3,
              color: "white",
              fontSize: "1.1rem",
            }}
            rowHeight={100}
            autoHeight
            columns={[
              {
                field: "Avatar",
                width: 80,
                renderCell: (params) => {
                  return <Avatar src={params.value.avatar} />;
                },
              },
              { field: "Username", width: 200 },
              { field: "Title", width: 350 },
              {
                field: "Link",
                width: 350,
                renderCell: (params) => {
                  return (
                    <Link href={params.value.link} target="_blank">
                      {params.value.link}
                    </Link>
                  );
                },
              },
              { field: "Answers", headerName: "No of Answers", width: 130 },
            ]}
            rows={questions.map((item: any) => {
              return {
                id: item["question_id"],
                Avatar: {
                  avatar: item["owner"]["profile_image"],
                },
                Username: item["owner"]["display_name"],
                Title: item["title"],
                Link: { link: item["link"] },
                Answers: item["answer_count"],
              };
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default FlexLayoutGrid;
