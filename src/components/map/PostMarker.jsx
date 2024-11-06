import { Marker } from 'react-leaflet';

function PostMarkers() {
    // สมมุติว่า Post_post ฟังก์ชันนี้ดึงข้อมูลโพสต์ทั้งหมด
    const posts = Post_post();

    return (
        <>
            {posts.map((post) => (
                // ตรวจสอบว่ามีพิกัด latitude และ longitude สำหรับแต่ละโพสต์
                post.latitude && post.longitude ? (
                    <Marker
                        key={post.id}
                        position={[post.latitude, post.longitude]}
                    >
                        {/* สามารถเพิ่ม Popup หรือข้อมูลเพิ่มเติมสำหรับแต่ละโพสต์ได้ */}
                    </Marker>
                ) : null
            ))}
        </>
    );
}

export default PostMarkers;
